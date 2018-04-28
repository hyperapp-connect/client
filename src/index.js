export { mapActions } from './mapActions'
export * as connect from './ws'
export { actions } from './actions'
export { state } from './state'

// default action for connected actions.
// will expect the response from the server to be a slice of the state.
// this slice will then be updated.
export const rem = res => () => res
