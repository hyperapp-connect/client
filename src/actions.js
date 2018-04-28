export const actions = {
  checkLogin: (state, actions, reverse = false) => (...args) => {
    if (!reverse) {
      if (state.user.jwt) {
        actions.location.go(state.loginRedirect)
      }
    } else if (!state.user.jwt) {
      actions.location.go(state.logoutRedirect)
    }
  }
}

export default actions
