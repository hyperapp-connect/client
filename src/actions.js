export const actions = {
  viewIfUser: () => (state, actions) => {
    if (!state.jwt) {
      actions.location.go(state.auth.redirect.logout)
    }
  },
  viewIfNoUser: () => (state, actions) => {
    if (state.jwt) {
      actions.location.go(state.auth.redirect.login)
    }
  },
}

export default actions
