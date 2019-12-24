import { createStore } from 'redux'
import reducers from './reducers'

/** @type { import('redux').Store } */
const store = createStore(reducers)

export default store
