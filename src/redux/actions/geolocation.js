export function setPosition (position) {
  return {
    type: 'SET_POSITION',
    position
  }
}

export function unavailable (error) {
  return {
    type: 'UNAVAILABLE',
    error
  }
}
