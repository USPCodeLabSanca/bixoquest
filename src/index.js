// Libs
import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/core'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

// Custom
import MuiTheme from './MuiTheme'
import routes from './constants/routes'

// Pages
import Home from './pages/Home'

// CSS
import './main-style.css'

function App () {
  return (
    <ThemeProvider theme={MuiTheme}>
      <BrowserRouter>
        <Switch>
          <Route path={routes.home} component={Home} />
          <Redirect to={routes.home} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
