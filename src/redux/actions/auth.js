import API, { silentAPI } from '../../api'

/** @argument {{ email: string, password: string }} user */
export async function login () {
  const { data: { user, token } } = await silentAPI.login()
  return {
    type: 'SET_USER',
    user,
    token
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
