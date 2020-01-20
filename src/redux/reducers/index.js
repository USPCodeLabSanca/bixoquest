import { combineReducers } from 'redux'
import authReducer from './auth'
import geolocationReducer from './geolocation'
import missionsReducer from './missions'

const reducers = combineReducers({
  auth: authReducer,
  geolocation: geolocationReducer,
  missions: missionsReducer
})

export default reducers
