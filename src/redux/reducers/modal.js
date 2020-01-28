const defaultState = {
  currentElement: null
}

export default function modalReducer (state, action) {
  if (!state || !action) return defaultState

  if (action.type === 'SET_CURRENT_MODAL') {
    return { currentElement: action.element }
  } else if (action.type === 'CLOSE_MODAL') {
    return { ...defaultState }
  } else {
    return state
  }
}
