import { h } from '../app'

const getClass = ({ path, to }) => path === to ? 'active' : ''

export const Link = ({ to }, children) => (state, actions) => (
  <a onclick={e => actions.router.go({ e, to })} href={to} class={getClass(state.router.pathname, to)}>
    {children || to}
  </a>
)
