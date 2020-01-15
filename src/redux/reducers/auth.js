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
  } else {
    return state
  }
}
