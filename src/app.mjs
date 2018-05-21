import hyper from 'hyperapp'
import { withContext } from './context/with'

export const app = hyper.app
export const h = hyper.h

export const appWithContext = withContext(app)

export default appWithContext
