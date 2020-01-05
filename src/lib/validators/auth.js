import { nusp, password } from './fields'

/** @argument {{ nusp: string, password: string }} user @returns { string[] } */
export const login = user => (
  [
    nusp(user.nusp),
    password(user.password)
  ].filter(e => e)
)
