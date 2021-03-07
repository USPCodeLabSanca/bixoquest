export function setCountry (name, abbreviation) {
  return {
    type: 'SET_COUNTRY',
    name: name,
    abbreviation: abbreviation
  }
}
