import React from 'react'

import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import BookIcon from '@material-ui/icons/ImportContacts'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'

import Routes from '../../constants/routes'

import Map from './map'
import Missions from './missions'
import Header from './header'

const style = {
  main: 'h-full flex flex-col justify-between',
  barRoot: 'flex space-between',
  buttonRoot: 'flex justify-center items-center height h-16 w-full transition',
  buttonSelected: 'bg-gray-400',
  buttonUnselected: 'bg-white'
}

const BarButton = ({ label, to }) => {
  const history = useHistory()
  const location = useLocation()
  const isButtonSelected = location.pathname === to

  const buttonStyle = style.buttonRoot + ' ' + (isButtonSelected ? style.buttonSelected : style.buttonUnselected)
  return <div className={buttonStyle} onClick={() => history.push(to)}>{label} </div>
}

export default function Tabs () {
  return (
    <main className={style.main}>
      <Header />
      <Switch>
        <Route component={Map} path={Routes.tabs.map} />
        <Route component={Missions} path={Routes.tabs.missions} />
        <Route component={Map} path={Routes.tabs.profile} />
      </Switch>
      <footer className={style.barRoot}>
        <BarButton label={<BookIcon />} to={Routes.tabs.missions} />
        <BarButton label={<HomeIcon />} to={Routes.tabs.map} />
        <BarButton label={<PersonIcon />} to={Routes.tabs.profile} />
      </footer>
    </main>
  )
}
