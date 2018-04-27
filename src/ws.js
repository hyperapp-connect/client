import { stringify, parse } from './json'

let ws = undefined

export const cache = []
export let open = false
export let apiVersion = "v0"

let error = (...msg) => console.error(...msg)

const isFunction = o => typeof o === "function"

const reactions = {
  onmessage: actions => e => {
    if (e.data === "Unknown Action") {
      error("Unknown Action", e)
      return
    }

    const [path, data] = parse(e.data)
    let action = actions

    path.split(".").forEach(key => {
      const fnName = `${key}_done`
      const sub = action[fnName]
      if (isFunction(sub)) {
        action = sub
      } else {
        action = action[key]
      }
    })

    if (isFunction(action)) {
      return action(data)
    }
  },
  open: () => {
    open = true

    while (cache.length) {
      const msg = cache.shift()
      ws.send(stringify(msg))
    }
  },
}

const retryConnect = (url, actions, wait = 1000) => new Promise(resolve => {
  if (open && ws) {
    return ws
  }

  wait += 500
  setTimeout(() => {
    createSocket(url, actions)
    resolve()
  }, wait)
})

const createSocket = (url, actions) => {
  open = false
  try {
    ws = new WebSocket(url)
  } catch (e) {
    // implement client error logging actions
  }

  ws.onopen = reactions.open
  ws.onmessage = reactions.onmessage(actions)

  ws.onclose = () => {
    open = false
    retryConnect(url, actions)
  }
}

export const connect = (actions, options = {}) => {
  const host = options.host || location.hostname
  const port = options.port || location.port
  const protocol = options.protocol || "ws"

  apiVersion = options.apiVersion || "v0"
  error = options.error || error

  createSocket(`${protocol}://${host}:${port}`, actions)

  return ws
}

export const send = msg => {
  if (open && ws) {
    ws.send(stringify(msg))
  } else {
    cache.push(msg)
  }
}

export default connect
