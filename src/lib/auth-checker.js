import React from 'react'

import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Routes from '../constants/routes'

/** Only renders a component if the user is logged in
@argument {React.Component} Component */
export const requiresAuthentication = Component => {
  return props => {
    const history = useHistory()
    /** @type {{ user: Object, token: string }} */
    const auth = useSelector(state => state.auth)

    // User is not logged in
    if (!auth.user) {
      setTimeout(() => history.push(Routes.login))
      return null
    } else {
      return <Component {...props} user={auth.user} />
    }
  }
}

/** Only renders a component if the user is not logged in
@argument {React.Component} Component */
export const requiresNoAuthentication = Component => {
  return props => {
    const history = useHistory()
    /** @type {{ user: Object, token: string }} */
    const auth = useSelector(state => state.auth)

    // User is logged in
    if (auth.user) {
      setTimeout(() => history.push(Routes.tabs.map))
      return null
    } else {
      return <Component {...props} />
    }
  }
}
