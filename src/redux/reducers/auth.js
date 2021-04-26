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
				availablePacks: action.mission.isSpecial
					? state.user.availablePacks
					: state.user.availablePacks + action.mission.numberOfPacks,
				availableSpecialPacks: action.mission.isSpecial
					? state.user.availableSpecialPacks + action.mission.numberOfPacks
					: state.user.availableSpecialPacks,
			},
		};
	} else if (action.type === 'OPEN_PACK') {
		return {
			...state,
			user: {
				...state.user,
				availablePacks: state.user.availablePacks - 1,
				openedPacks: state.user.openedPacks + 1,
				stickers: [...state.user.stickers, action.stickerId],
			},
		};
	} else if (action.type === 'OPEN_SPECIAL_PACK') {
		return {
			...state,
			user: {
				...state.user,
				availableSpecialPacks: state.user.availableSpecialPacks - 1,
				openedSpecialPacks: state.user.openedSpecialPacks + 1,
				specialStickers: [...state.user.specialStickers, action.specialStickerId],
			},
		};
	} else if (action.type === 'DONATE_STICKERS') {
		const newStickers = [...state.user.stickers];
		action.stickers.forEach(sticker => {
			const index = newStickers.findIndex(item => item === sticker);
			newStickers.splice(index, 1);
		});
		return {
			...state,
			user: {
				...state.user,
				stickers: newStickers,
			},
		};
	} else if (action.type === 'DONATE_SPECIAL_STICKERS') {
		const newSpecialStickers = [...state.user.specialStickers];
		action.specialStickers.forEach(specialSticker => {
			const index = newSpecialStickers.findIndex(item => item === specialSticker);
			newSpecialStickers.splice(index, 1);
		});
		return {
			...state,
			user: {
				...state.user,
				specialStickers: newSpecialStickers,
			},
		};
	} else if (action.type === 'ADD_FRIEND') {
		return {
			...state,
			user: {
				...state.user,
				friends: [...state.user.friends, action.friendId],
			},
		};
	} else {
		return state;
	}
}
