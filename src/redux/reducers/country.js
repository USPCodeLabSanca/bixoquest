const initialState = {
	name: null,
	abbreviation: null,
};

export default function countryReducer(state = initialState, action) {
	if (action.type === 'SET_COUNTRY') {
		return {
			name: action.name,
			abbreviation: action.abbreviation,
		};
	} else if (action.type === 'SET_ABBREVIATION') {
		return {
			name: state.name,
			abbreviation: action.abbreviation,
		};
	} else {
		return state;
	}
}
