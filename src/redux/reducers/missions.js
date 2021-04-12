const initialState = {
	nearbyMissions: null,
};

export default function missionsReducer(state = initialState, action) {
	if (action.type === 'SET_NEARBY_MISSIONS') {
		return { nearbyMissions: action.nearbyMissions };
	} else {
		return state;
	}
}
