import { parseRoute } from './parseRoute'

export const Route = props => ({ state, actions }, setContext) => {
  setContext({ ...{ state, actions } })

  const location = state.location
  const match = parseRoute(props.path, state.location.pathname, {
    exact: !props.parent || props.exact,
  })

  return (
    match &&
    props.render({
      match: match,
      location: state.location,
    })
  )
}
