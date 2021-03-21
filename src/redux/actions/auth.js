import API, { silentAPI } from '../../api'

export async function tryAuthenticateWithUSPCookie () {
  const { data: { data: { user, token } } } = await silentAPI.tryAuthenticateWithUSPCookie()
  return {
    type: 'SET_USER',
    user,
    token
  }
}

export async function login (email, password) {
  const { data: { user } } = await API.login(email, password)
  return {
    type: 'SET_USER',
    user,
  }
}

export async function updateUser () {
  const { data: { data: user } } = await silentAPI.getUser()
  return {
    type: 'SET_USER',
    user: user
  }
}

export function logout () {
  return { type: 'LOGOUT' }
}

/** @argument { string } token */
export function updateToken (token) {
  return {
    type: 'UPDATE_TOKEN',
    token
  }
}
