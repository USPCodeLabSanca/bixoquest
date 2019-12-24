// TODO - Replace this with the actual API request
const fakeRequest = () => new Promise(resolve => setTimeout(resolve, 500))

/** @argument {{ email: string, password: string }} user */
export async function login (user) {
  await fakeRequest()
  return {
    type: 'LOGIN',
    user
  }
}

/** @argument {{ email: string, password: string }} user */
export async function signup (user) {
  await fakeRequest()
  return {
    type: 'SIGNUP',
    user
  }
}
