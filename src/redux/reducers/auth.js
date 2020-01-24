const defaultState = {
  user: null,
  token: null
}

export default function authReducer (state, action) {
  if (!state || !action) return defaultState

  if (action.type === 'SET_USER') {
    return { ...state, user: action.user }
  } else if (action.type === 'UPDATE_TOKEN') {
    return { ...state, token: action.token }
  } else if (action.type === 'LOGOUT') {
    return { ...defaultState }
  } else if (action.type === 'COMPLETE_MISSION') {
    return {
      ...state,
      user: {
        completed_missions: [...state.user.completed_missions, action.missionId]
      }
    }
  } else {
    return state
  }
}
