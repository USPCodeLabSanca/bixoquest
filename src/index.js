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

// Pages
import Home from './pages/Home'
import Login from './pages/login'

// CSS
import './main-style.css'
import './tailwind.build.css'

function App () {
  return (
    <ThemeProvider theme={MuiTheme}>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path={routes.home} component={Home} />
            <Route path={routes.login} component={Login} />
            <Redirect to={routes.home} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
