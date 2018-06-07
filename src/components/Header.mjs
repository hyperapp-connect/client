import { h } from '../app'

import { Menu } from './Menu'

const Logo = ({ logo }) => (
  <img src={ logo.src } alt={logo.alt || logo.title} href={logo.href} />
)

export const Header = ({ menu, pages, logo, header }) => state => (
  <header class="main">
    { logo && <Logo logo={logo} /> }
    { state.menu.header && <Menu name="header" collapse={600} /> }
    { header }
  </header>
)

export default Header
