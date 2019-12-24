import {} from 'redux'

const defaultState = {
  user: null,
  token: null
}

export default function authReducer (state, action) {
  if (!state || !action) return defaultState

  if (action.type === 'LOGIN') {
    return { user: action.user }
  } else if (action.type === 'SIGNUP') {
    return { user: action.user }
  } else {
    return state
  }
}
