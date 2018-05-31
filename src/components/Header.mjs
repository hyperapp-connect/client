import { h } from '../app'

import { Menu } from './Menu'
import { Routes } from './Routes'

const Logo = ({ logo }) => (
  <img src={ logo.src } alt={logo.alt || logo.title} href={logo.href} />
)

export const Header = ({ menu, pages, logo }) => (
  <header class="main">
    { logo && <Logo logo={logo} /> }
    <Menu name={menu} />

    <Routes pages={pages} />
  </header>
)

export default Header
