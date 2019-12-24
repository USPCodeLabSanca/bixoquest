// TODO - Replace this with the actual API request
const fakeRequest = () => new Promise(resolve => setTimeout(resolve, 500))

export async function login (email, password) {
  await fakeRequest()
  const user = { email, password }

  return {
    type: 'LOGIN',
    user
  }
}

export async function signup (email, password) {
  await fakeRequest()
  const user = { email, password }

  return {
    type: 'SIGNUP',
    user
  }
}

/** @argument { string } token */
export function updateToken (token) {
  return {
    type: 'UPDATE_TOKEN',
    token
  }
}
