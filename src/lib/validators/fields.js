export const password = password => {
  if (password === null || password === undefined) return 'A senha é obrigatória.'
  if (!password) return 'A senha não pode ser vazia.'
  if (typeof password !== 'string') return 'A senha deve ser uma string.'
  if (password.trim() !== password) return 'A senha não deve começar nem terminar com espaços.'
  if (password.length < 8) return 'A senha deve conter pelo menos 8 characteres.'
  return null
}

export const nusp = nusp => {
  if (nusp === null || nusp === undefined) return 'O Número USP é obrigatório.'
  if (!nusp) return 'O Número USP não pode ser vazio.'
  if (typeof nusp !== 'string') return 'O Número USP deve ser uma string.'
  if (nusp.match(/\D/)) return 'O Número USP deve conter apenas números.'
  return null
}

export const email = email => {
  const emailValidatorRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (email === null || email === undefined) return 'O email é obrigatório.'
  if (!email) return 'O email não pode ser vazio.'
  if (typeof email !== 'string') return 'O email deve ser uma string.'
  if (!emailValidatorRegex.test(email.toLowerCase())) return 'Este e-mail é invalido'
  return null
}