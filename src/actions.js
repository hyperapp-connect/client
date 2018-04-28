export const actions = {
  checkLogin: (state, actions, reverse = false) => (...args) => {
    if (!reverse) {
      if (state.user.jwt) {
        actions.location.go(state.auth.redirect.login)
      }
    } else if (!state.user.jwt) {
      actions.location.go(state.auth.redirect.logout)
    }
  }
}

export default actions
