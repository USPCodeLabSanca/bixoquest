// Libs
import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/core'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer, toast } from 'react-toastify'

// Custom
import MuiTheme from './MuiTheme'
import routes from './constants/routes'
import { store, persistor } from './redux/store'
import { logout as logoutAction, updateToken } from './redux/actions/auth'
import { initializeAPI } from './api/base-api'
import APIBaseURL from './constants/api-url'
import { GeoActions } from './redux/actions'
import ModalRenderer from './services/modal-renderer'
import { requiresAuthentication, requiresNoAuthentication } from './lib/auth-checker'

// Pages
import Tabs from './pages/tabs'
import Login from './pages/login'
import GiveCards from './pages/give-cards'

// CSS
import './main-style.css'
import './tailwind.build.css'
import 'react-toastify/dist/ReactToastify.min.css'

initializeAPI({
  baseURL: APIBaseURL,
  tokenSelector: () => store.getState().auth.token,
  tokenDispatcher: newToken => store.dispatch(updateToken(newToken)),
  onError: message => toast.error(message),
  onBadToken: () => {
    toast.error('Parece que sua sessão expirou! Por favor, faça o login de novo')
    store.dispatch(logoutAction())
    window.location.pathname = '/login'
  }
})

navigator.geolocation.watchPosition(
  pos => store.dispatch(GeoActions.setPosition(pos)),
  error => {
    store.dispatch(GeoActions.unavailable(error))
    console.error(error)
  },
  {
    enableHighAccuracy: true
  }
)

function App () {
  return (
    <ThemeProvider theme={MuiTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ModalRenderer />
          <BrowserRouter>
            <Switch>
              <Route
                path={[routes.tabs.map, routes.tabs.profile, routes.tabs.missionsTabs.missions, routes.tabs.missionsTabs.stickers]}
                component={requiresAuthentication(Tabs)}
              />
              <Route
                path={routes.login}
                component={requiresNoAuthentication(Login)}
              />
              <Route
                path={routes.giveCards}
                component={requiresAuthentication(GiveCards)}
              />
              <Redirect to={routes.login} />
            </Switch>
          </BrowserRouter>
          <ToastContainer hideProgressBar />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
