import { h } from '../app'
import { Link } from './Link'

export const MenuItem = ({ to, text }) => (
  <li>
    <Link to={to}>{text}</Link>
  </li>
)

export const MenuItems = ({ items }) => <ul>{items.map(MenuItem)}</ul>

export const Menu = ({ name }) => state =>
  state.menu[name].length > 0 && (
    <nav class={`Menu ${name}`}>
      <MenuItems items={state.menu[name]} />
    </nav>
  )

export default Menu
