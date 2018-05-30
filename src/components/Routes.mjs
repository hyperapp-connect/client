import { h } from '../app'

export const Routes = ({ pages }) => state => pages && pages[state.router.pathname]

export default Routes
