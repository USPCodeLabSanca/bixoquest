export function setCurrentModal (modalElement) {
  return {
    type: 'SET_CURRENT_MODAL',
    element: modalElement
  }
}

export function closeModal () {
  return {
    type: 'CLOSE_MODAL'
  }
}
