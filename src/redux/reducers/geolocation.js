const defaultState = {
	isAvailable: null,
	error: null,
	position: null,
};

export default function authReducer(state, action) {
	if (!state || !action) return defaultState;

	if (action.type === 'SET_POSITION') {
		return { ...state, position: action.position, isAvailable: true, error: null };
	} else if (action.type === 'UNAVAILABLE') {
		return { ...state, position: null, isAvailable: false, error: action.error };
	} else {
		return state;
	}
}
