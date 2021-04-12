import { combineReducers } from 'redux';
import authReducer from './auth';
import missionsReducer from './missions';
import modalsReducer from './modal';

const reducers = combineReducers({
	auth: authReducer,
	missions: missionsReducer,
	modal: modalsReducer,
});

export default reducers;
