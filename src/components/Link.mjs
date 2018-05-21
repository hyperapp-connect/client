import { h } from '../app'

export const Link = ({ to }, children) => (_, actions) =>
  <a onclick={e => actions.go({ e, to })} href={to}>{children || to}</a>
