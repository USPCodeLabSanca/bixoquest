import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import reducers from './reducers';
import persistConfig from '../constants/redux-persist-config';

const persistedReducer = persistReducer(persistConfig, reducers);

/** @type { import('redux').Store } */
export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
