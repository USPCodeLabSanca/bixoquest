import React from 'react'

import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import { AuthActions } from '../redux/actions'
import Routes from '../constants/routes'
import validators from '../lib/validators'

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
  const nuspRef = React.useRef()
  const passwordRef = React.useRef()

  const login = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const nusp = nuspRef.current.value.trim()
      const password = passwordRef.current.value.trim()
      const newUser = { nusp, password }
      const errors = validators.login(newUser)
      if (errors.length > 0) return window.alert(errors.join('\n'))
      const action = await AuthActions.login(newUser)

      // This timeout is to prevent unmounting before the state changes
      setTimeout(() => {
        dispatch(action)
        history.push(Routes.tabs.map)
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
      <p className={style.subheader}>Entrar com número USP e senha única</p>
      <form onSubmit={login} className={style.card}>
        <input ref={nuspRef} placeholder='Número USP' className={style.input} />
        <input ref={passwordRef} placeholder='Senha' className={style.input} />
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
