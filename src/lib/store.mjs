import { json } from './json'

let storage = {}

const defaultStorage = {
  clear: () => {
    storage = defaultStorage
  },
}

if (typeof localStorage === 'undefined') {
  storage = defaultStorage
} else {
  storage = localStorage
}

export const load = (key = 'state') => json.parse(storage[key])

export const save = (key, val = 'state', exclude = []) => {
  if (val === 'state') {
    val = key
    key = 'state'
  }

  if (!val || !Object.keys(val).length) {
    return
  }

  val = reduce(val, exclude)

  storage[key] = json.stringify(val)
  return val
}

const mergeArray = (a1, a2) => {
  if (!Array.isArray(a2)) {
    return a1
  }

  const longest = a1.length > a2.length ? a1 : a2
  return longest.map((val, idx) => createState(a1[idx], a2[idx]))
}

const mergeObject = (o1, o2) => {
  const merged = { ...o1, ...o2 }
  const keys = Object.keys(merged)

  const o = {}
  Object.entries(merged).map(([key, val]) => {
    if (!o1.hasOwnProperty(key)) {
      o[key] = o2[key]
    } else if (!o2.hasOwnProperty(key)) {
      o[key] = o1[key]
    } else {
      if (Array.isArray(o1[key])) {
        o[key] = mergeArray(o1[key], o2[key])
      } else if (typeof o1[key] === 'object') {
        o[key] = createState(o1[key], o2[key])
      } else {
        if (typeof o2[key] !== 'undefined') {
          o[key] = o2[key]
        } else {
          o[key] = o1[key]
        }
      }
    }
  })

  return o
}

const createState = (state, old) => {
  if (typeof state === 'undefined') {
    return old
  } else if (typeof old === 'undefined') {
    return state
  } else if (Array.isArray(state)) {
    return state
  } else if (typeof state === 'function') {
    return state.toString()
  } else if (state instanceof RegExp) {
    return state.toString()
  } else if (state instanceof Date) {
    return state.getTime()
  } else if (typeof state === 'object') {
    return mergeObject(state, old)
  }

  return state
}

const reduce = (state = {}, exclude = []) => {
  if (!Object.keys(state).length) {
    return {}
  }

  if (!exclude.length) {
    return state
  } else {
    const res = {}
    Object.keys(state).forEach(key => {
      if (exclude.indexOf(key) === -1) {
        res[key] = state[key]
      }
    })
    return res
  }
}

export const hydrate = (exclude = []) => (state, actions) => {
  const save = createState(state, load())

  return reduce(save, exclude)
}

export const store = {
  load,
  save,
  hydrate,
  storage,
}

export default store
