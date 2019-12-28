import {} from 'redux'

const defaultState = {
  user: null,
  token: null
}

export default function authReducer (state, action) {
  if (!state || !action) return defaultState

  if (action.type === 'SET_USER') {
    return { user: action.user }
  } else {
    return state
  }
}
