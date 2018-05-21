export const Redirect = props =>
  (state, actions) => {
    const location = state.location
    history.replaceState(props.from || location.pathname, "", props.to)
  }
