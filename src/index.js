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
import Home from './pages/Home'
import Login from './pages/login'

// CSS
import './main-style.css'
import './tailwind.build.css'

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
            <Route path={routes.home} component={Home} />
            <Route path={routes.login} component={requiresNoAuthentication(Login)} />
            <Redirect to={routes.home} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
