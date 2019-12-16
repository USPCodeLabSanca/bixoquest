import {} from 'redux'

const defaultState = {
  user: null,
  token: null
}

export default function authReducer (state, action) {
  if (!state || !action) return defaultState

  if (action === 'LOGIN') {
    return { ...state, user: action.user }
  } else if (action === 'SIGNUP') {
    return { ...state, user: action.user }
  } else if (action === 'UPDATE_TOKEN') {
    return { ...state, token: action.token }
  } else {
    return state
  }
}
