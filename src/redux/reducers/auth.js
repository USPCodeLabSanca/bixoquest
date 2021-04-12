const defaultState = {
	user: null,
	token: null,
};

export default function authReducer(state, action) {
	if (!state || !action) return defaultState;

	if (action.type === 'SET_USER') {
		const newState = { ...state, user: action.user };
		if (action.token) newState.token = action.token;
		return newState;
	} else if (action.type === 'UPDATE_TOKEN') {
		return { ...state, token: action.token };
	} else if (action.type === 'LOGOUT') {
		return { ...defaultState };
	} else if (action.type === 'COMPLETE_MISSION') {
		return {
			...state,
			user: {
				...state.user,
				completedMissions: [...state.user.completedMissions, action.mission._id],
				availablePacks: state.user.availablePacks + action.mission.numberOfPacks,
			},
		};
	} else if (action.type === 'OPEN_PACK') {
		return {
			...state,
			user: {
				...state.user,
				availablePacks: state.user.availablePacks - 1,
				opened_packs: state.user.opened_packs + 1,
				stickers: [...state.user.stickers, action.stickerId],
			},
		};
	} else if (action.type === 'RECEIVE_DONATION') {
		return {
			...state,
			user: {
				...state.user,
				stickers: [...state.user.stickers, ...action.stickers],
			},
		};
	} else {
		return state;
	}
}
