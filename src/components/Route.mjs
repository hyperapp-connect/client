import { h } from '../app'

export const Route = (props, children) => (state, actions) => {
  const { pathname } = state.location
  const { path } = props

  if (props.exact && pathname !== path) {
    return
  } else if (pathname.indexOf(path) === -1) {
    return
  }

  return <div class={props.class}>{children}</div>
}

export default Route
