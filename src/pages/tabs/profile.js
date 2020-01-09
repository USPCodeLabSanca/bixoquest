import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setCountry } from '../../redux/actions/country'

export default function Profile () {
  const country = useSelector(state => state.country)
  const dispatch = useDispatch()

  function updateCountryToBrazil () {
    const action = setCountry('Brazil', 'BR')
    dispatch(action)
  }

  return (
    <div>
      <h1>Bem vindo, voce está {country.name ? country.name : 'em pais nenhum'}</h1>
      <button onClick={updateCountryToBrazil}>
        Change country to brazil
      </button>
    </div>
  )
}
