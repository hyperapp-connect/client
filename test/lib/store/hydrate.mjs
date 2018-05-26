import { is } from '@magic/test'

import { store } from '../../../src/lib'

const { hydrate } = store

export default [
  { fn: () => hydrate()(), expect: is.object, info: 'hydrate returns object without args' },
  { fn: () => hydrate()(), expect: is.empty, info: 'hydrate returns empty object without args' },
  { fn: hydrate()({ test: true }), expect: t => t.test === true, info: 'returns arguments' },
  { fn: hydrate(['test'])({ test: true }), expect: is.empty, info: 'returns filtered arguments' },
]
