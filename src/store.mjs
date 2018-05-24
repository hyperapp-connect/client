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

const mergeArray = (a1, a2) => {
  if(!Array.isArray(a2)) {
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
  old = typeof old !== 'undefined' ? old : load()

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
  } else if (typeof state.getTime === 'function') {
    return state.getTime()
  } else if (typeof state === 'object') {
    return mergeObject(state, old)
  } else {
    return state
  }
}

export const hydrate = () => (state, actions) => {
  const save = createState(state)
  return save
}

export const store = {
  load,
  save,
  hydrate,
}

export default store
