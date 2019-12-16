import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/core'
import MuiTheme from './MuiTheme'

// CSS
import './main-style.css'
function App () {
  return (
    <ThemeProvider theme={MuiTheme}>
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
