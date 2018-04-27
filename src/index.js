import map from './mapActions'
import socket from './ws'

// default action for connected actions.
// will expect the response from the server to be a slice of the state.
// this slice will then be updated.
export const rem = res => () => res

export const connect = socket
export const mapActions = map
