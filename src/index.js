export { mapActions } from './mapActions'
export { connect, send } from './ws'
export { actions } from './actions'
export { state } from './state'

const exp = connect
exp.connect = connect
exp.send = send

export const ws = exp
