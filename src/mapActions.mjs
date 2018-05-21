import { send } from './ws'

export const mapActions = (actions = {}, remote = {}, parent = null) => {
  Object.keys(remote).forEach(name => {
    const action = remote[name]
    const key = parent ? `${parent}.${name}` : name

    if (typeof action === 'function') {
      actions[name + '_done'] = res => (state, actions) => {
        if (!res.ok || !res.hasOwnProperty('data')) {
          if (!res.errors && !res.error) {
            res = {
              error: 'Unknown Error',
              res,
            }
          }
          return {
            errors: res.errors || [res.error],
          }
        }
        return action(res)(state, actions)
      }

      actions[name] = data => (state = {}) => {
        if (state.jwt) {
          data.jwt = state.jwt
        }

        const msg = [key, data]
        send(msg)
      }

      return
    }

    if (typeof action === 'object') {
      actions[name] = mapActions(actions[name], action, key)
      return
    }
  })

  if (!actions.socketServerConnect) {
    actions.socketServerConnect = t => () => ({ connected: t })
  }

  return actions
}

export default mapActions
