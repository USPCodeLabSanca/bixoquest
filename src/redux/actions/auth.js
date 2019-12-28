import API from '../../api'

/** @argument {{ email: string, password: string }} user */
export async function login (user) {
  const response = await API.login(user)
  return {
    type: 'SET_USER',
    user: response.data.data
  }
}

/** @argument { string } token */
export function updateToken (token) {
  return {
    type: 'UPDATE_TOKEN',
    token
  }
}
