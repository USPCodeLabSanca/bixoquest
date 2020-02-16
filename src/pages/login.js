import React from 'react'

import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import backendURL from '../constants/api-url'
import * as AuthActions from '../redux/actions/auth'
import * as ModalActions from '../redux/actions/modal'
import Modal from '../components/modal'

const style = {
  root: 'flex flex-col justify-center text-center px-4 pb-4 bg-primary h-full',
  header: 'text-4xl mb-4',
  subheader: 'text-md mb-8',
  card: 'bg-white shadow-lg rounded-lg w-full p-6'
}

/** LoginScreen */
const LoginScreen = () => {
  const dispatch = useDispatch()

  const login = async () => {
    window.location.href = backendURL + 'auth'
  }

  React.useEffect(() => {
    (async () => {
      try {
        dispatch(ModalActions.setCurrentModal(<Modal>
          <div className="w-full h-full flex justify-center items-center p-8">
            <CircularProgress size={50} style={{ color: 'white' }} />
          </div>
        </Modal>))
        const action = await AuthActions.login()
        dispatch(action)
      } catch (e) { console.error(e) } finally {
        dispatch(ModalActions.closeModal())
      }
    })()
  }, [])

  return (
    <main className={style.root}>
      <div className={style.card}>
        <h1 className={style.header}>BixoQuest</h1>
        <p className={style.subheader}>Entrar com número USP e senha única</p>
        <Button variant='contained' onClick={login} type='submit' color='secondary' fullWidth>
          entrar
        </Button>
      </div>
    </main>
  )
}

export default LoginScreen
