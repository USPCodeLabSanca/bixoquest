import * as validators from './fields'

/**
 * Validates a login (email and password)
 * @param {string} email
 * @param {string} password
 * @returns {string[]}
 */
export const validateLogin = (email, password) => (
  [
    validators.email(email),
    validators.password(password)
  ].filter(e => e)
)
