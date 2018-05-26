import error from './error'
const isString = o => typeof o === 'string'

export const parse = msg => {
  if (!isString(msg)) {
    return msg
  }

  try {
    return JSON.parse(msg)
  } catch (e) {
    error(e)
    return msg
  }
}

export const stringify = msg => {
  try {
    if (isString(msg)) {
      return msg
    }

    return JSON.stringify(msg)
  } catch (e) {
    error(e)
    return msg
  }
}

export const json = {
  parse,
  stringify,
}

export default json
