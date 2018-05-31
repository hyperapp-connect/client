import { send } from './ws'
import { router } from './router'
import { store } from './store'

export const mapActions = (actions = {}, remote = {}, parent = null) => {
  Object.keys(remote).forEach(name => {
    const action = remote[name]
    const key = parent ? `${parent}.${name}` : name

    if (typeof action === 'function') {
      actions[name + '_done'] = res => (state, actions) => {
        let { error, errors } = res
        if (errors && errors.length) {
          if (error) {
            errors.push(error)
          }
        } else if (!errors && error) {
          errors = [error]
        }

        if (errors && errors.length) {
          return {
            errors
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

  actions.socketServerConnect = t => () => {
    if (actions.socketServerConnect) {
      return actions.socketServerConnect({ connected: t })
    } else {
      return { connected: t }
    }
  }

  actions.router = router.actions

  actions.hydrate = store.hydrate
  actions.saveState = store.save

  return actions
}

export default mapActions
