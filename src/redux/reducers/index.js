import { combineReducers } from 'redux'
import authReducer from './auth'
import geolocationReducer from './geolocation'

const reducers = combineReducers({
  auth: authReducer,
  geolocation: geolocationReducer
})

export default reducers
