export { mapActions } from './mapActions'
export { connect, send } from './ws'
export { router } from './router'

export { json } from './json'

export * from './components'

import { app as _app } from './app'

export const app = _app
export default _app
