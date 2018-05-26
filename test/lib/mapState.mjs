import { is } from '@magic/test'

import { mapState } from '../../src/lib/mapState'

export default [
  { fn: () => mapState(), expect: is.object, info: 'always return objects' },
]
