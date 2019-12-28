// Libs
import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/core'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

// Custom
import MuiTheme from './MuiTheme'
import routes from './constants/routes'
import { store, persistor } from './redux/store'
import { initializeAPI } from './api/base-api'
import APIBaseURL from './constants/api-url'
import { updateToken } from './redux/actions/auth'
import { requiresAuthentication, requiresNoAuthentication } from './lib/auth-checker'

// Pages
import Tabs from './pages/tabs'
import Login from './pages/login'

// CSS
import './main-style.css'
import './tailwind.build.css'
import 'ol/ol.css'

initializeAPI({
  baseURL: APIBaseURL,
  tokenSelector: () => store.getState().auth.token,
  tokenDispatcher: newToken => store.dispatch(updateToken(newToken)),
  onError: message => window.alert(message)
})

function App () {
  return (
    <ThemeProvider theme={MuiTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Switch>
              <Route
                path={[routes.tabs.map, routes.tabs.missions, routes.tabs.profile]}
                component={requiresAuthentication(Tabs)}
              />
              <Route
                path={routes.login}
                component={requiresNoAuthentication(Login)}
              />
              <Redirect to={routes.login} />
            </Switch>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
