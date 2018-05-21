import { h } from '../app'

export const Link = ({ to }, children) => (_, actions) =>
  <a onclick={e => actions.router.go({ e, to })} href={to}>{children || to}</a>
