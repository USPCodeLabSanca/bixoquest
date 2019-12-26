import React from 'react'

import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import { AuthActions } from '../redux/actions'
import Routes from '../constants/routes'

const style = {
  root: 'flex flex-col items-center text-center px-4 bg-primary h-full text-white',
  header: 'text-6xl mt-16',
  subheader: 'text-2xl mb-8',
  card: 'bg-white shadow-lg rounded-lg grid row-gap-6 w-full p-6',
  input: 'border border-black rounded-lg p-4 text-black',
  button: 'text-white bg-secondary rounded-lg p-4'
}

/** LoginScreen */
const LoginScreen = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = React.useState(false)
  const emailRef = React.useRef()
  const passwordRef = React.useRef()

  const login = async (event) => {
    setIsLoading(true)
    try {
      const email = emailRef.current.value
      const password = passwordRef.current.value
      event.preventDefault()
      const action = await AuthActions.login({ email, password })

      // This timeout is to prevent unmounting before the state changes
      setTimeout(() => {
        dispatch(action)
        history.push(Routes.home)
      })
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className={style.root}>
      <h1 className={style.header}>BixoQuest</h1>
      <p className={style.subheader}>Entrar com email USP e senha única</p>
      <form onSubmit={login} className={style.card}>
        <input ref={emailRef} placeholder='E-mail address' className={style.input} />
        <input ref={passwordRef} placeholder='Password' className={style.input} />
        <button
          disabled={isLoading}
          type='submit'
          className={style.button}
          onClick={login}
        >
          LOGIN {isLoading && <CircularProgress size={15} color='inherit' />}
        </button>
      </form>
    </main>
  )
}

export default LoginScreen
