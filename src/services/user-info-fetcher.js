import React from 'react'

import { updateUser } from '../redux/actions/auth'
import { useDispatch, useSelector } from 'react-redux'

export default function UserInfoFetcher () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)

  async function fetchUserData () {
    try {
      const action = await updateUser()
      dispatch(action)
    } catch (e) { console.error('THIS IS A SILENT ERROR', e) }
  }

  React.useEffect(() => {
    if (!user) return // only update if logged in
    fetchUserData()
    const handler = setInterval(fetchUserData, 1000 * 60)
    return () => clearInterval(handler)
  }, [Boolean(user)])

  return null
}
