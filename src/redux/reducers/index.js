import { combineReducers } from 'redux'
import authReducer from './auth'
import geolocationReducer from './geolocation'
import countryReducer from './country'

const reducers = combineReducers({
  auth: authReducer,
  country: countryReducer,
  geolocation: geolocationReducer
})

export default reducers
