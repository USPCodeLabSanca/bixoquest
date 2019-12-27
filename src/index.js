// Libs
import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/core'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

// Custom
import MuiTheme from './MuiTheme'
import routes from './constants/routes'
import store from './redux/store'
import { requiresNoAuthentication } from './lib/auth-checker'
import { initializeAPI } from './api/base-api'
import APIBaseURL from './constants/api-url'
import { updateToken } from './redux/actions/auth'

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
        <BrowserRouter>
          <Switch>
            <Route path={[routes.tabs.map, routes.tabs.missions, routes.tabs.profile]} component={Tabs} />
            <Route path={routes.login} component={requiresNoAuthentication(Login)} />
            <Redirect to={routes.tabs.map} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
