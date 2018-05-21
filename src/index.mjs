export { mapActions } from './mapActions'
export { connect, send } from './ws'
export { actions } from './actions'
export { state } from './state'
export { router } from './router'

export * from './components'

import { app as _app } from './app'

export const app = _app
export default _app
