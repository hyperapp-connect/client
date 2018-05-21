import { h } from '../app'

export const Route = (props, children) => (state, actions) => {
  const { pathname } = state.router
  const { path } = props

  if (props.exact && pathname !== path) {
    return
  } else if (pathname.indexOf(path) === -1) {
    return
  }

  return <div class={props.class}>{children}</div>
}

export default Route
