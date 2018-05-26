import { is } from '@magic/test'

import { store } from '../../../src/lib'

const { save, load, storage } = store

const before = () => {
  storage.clear()

  return () => {
    storage.clear()
  }
}

export default [
  { fn: () => save(), expect: undefined, info: 'save returns arguments' },
  {
    fn: () => save('t', { t: true }),
    before,
    expect: t => load('t').t === true,
    info: 'save returns arguments',
  },
  {
    fn: () => save('t2', { t: true }),
    before,
    expect: t => load('t2').t === true,
    info: 'save returns arguments',
  },
  {
    fn: () => save('t3', { t: true }, ['t']),
    before,
    expect: t => is.empty(t),
    info: 'save returns filtered by exclude',
  },
  {
    fn: () => save('t4', { t: true }, ['t']),
    before,
    expect: t => !load('t4').hasOwnProperty('t'),
    info: 'save saves filtered by exclude',
  },
]
