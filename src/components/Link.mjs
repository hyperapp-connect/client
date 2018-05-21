import { h } from '../app'

export const Link = (props, children) => (_, actions) =>
  <a onclick={actions.go(props.href || props.to)}>{children}</a>
