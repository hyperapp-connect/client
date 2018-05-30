import { h } from '../app'

import { Menu } from './Menu'
import { Routes } from './Routes'

export const Header = ({ menu, pages }) => (
  <header class="main">
    <Menu name={menu} />

    <Routes pages={pages} />
  </header>
)

export default Header
