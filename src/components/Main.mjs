import { h } from '../app'
import { Header } from './Header'
import { Routes } from './Routes'

export const Main = ({ pages, menu, footer }, children) => (state, actions) => (
  <main oncreate={actions.hydrate} onupdate={() => actions.saveState(state)}>
    <Header menu={menu} logo={state.logo} />

    <Routes pages={pages} />

    {children}
  </main>
)

export default Main
