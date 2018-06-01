import { h } from '../app'
import { Link } from './Link'

export const MenuItem = ({ to, text }) => (
  <li>
    <Link to={to}>{text}</Link>
  </li>
)

export const MenuItems = ({ items }) => <ul>{items.map(MenuItem)}</ul>

const width = collapse => {
  const win = typeof window !== 'undefined' ? window : { innerWidth: 0 }
  return win.innerWidth <= collapse
}

const classGen = (state, name, collapse) => {
  const collapsed = state.menu.collapsed && state.menu.collapsed[name]
  if (width(collapse) && collapsed) {
    return ` collapsed coll-${collapse}`
  } else {
    return ''
  }
}

export const Menu = ({ name, collapse }) => (state, actions) => (
  <nav class={`Menu ${name}${classGen(state, name, collapse)}`}>
    <div onclick={() => actions.menu.toggle(name)}>collapse</div>
    { state.menu.collapsed && !state.menu.collapsed[name] && <MenuItems items={state.menu[name]} /> }
  </nav>
)

export default Menu
