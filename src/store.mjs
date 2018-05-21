import { json } from './json'

let storage = {}

const defaultStorage = {
  clear: () => {
    storage = {}
  },
}

if (typeof localStorage === 'undefined') {
  storage = defaultStorage
} else {
  storage = localStorage
}

export const load = (key = 'state') => json.parse(storage[key])

export const save = (key, val = 'state') => {
  if (val === 'state') {
    val = key
    key = 'state'
  }

  storage[key] = json.stringify(val)
  return val
}

export const hydrate = (first = false) => (state, actions) => {
  if (first && storage.state) {
    return load()
  } else if (json.stringify(state) !== storage.state) {
    return save(state)
  }
}

export const store = {
  load,
  save,
  hydrate,
}

export default store
