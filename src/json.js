import error from './error'
const isString = o => typeof o === "string"

export const parse = msg => {
  if (!isString(msg)) {
    return msg
  }

  try {
    return JSON.parse(msg)
  } catch (e) {
    return msg
  }
}

export const stringify = msg => {
  try {
    if (isString(msg)) {
      msg = JSON.parse(msg)
    }

    msg[0] = `${apiVersion}.${msg[0]}`

    return JSON.stringify(msg)
  } catch (e) {
    error(e)
  }
}

export default {
  parse,
  stringify,
}
