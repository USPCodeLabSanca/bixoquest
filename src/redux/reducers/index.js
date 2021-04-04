import { combineReducers } from 'redux';
import authReducer from './auth';
import geolocationReducer from './geolocation';
import missionsReducer from './missions';
import modalsReducer from './modal';

const reducers = combineReducers({
	auth: authReducer,
	geolocation: geolocationReducer,
	missions: missionsReducer,
	modal: modalsReducer,
});

export default reducers;
