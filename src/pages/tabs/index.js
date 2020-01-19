import React from 'react'

import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import BookIcon from '@material-ui/icons/ImportContacts'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'

import Routes from '../../constants/routes'

import Map from './map'
import Missions from './missions'
import Header from './header'
import Profile from './profile'
import Stickers from './stickers'

const style = {
  main: 'h-full flex flex-col justify-between bg-gray-400',
  footer: 'flex space-between shadow-lg w-full bg-white'
}

const TabOrder = [Routes.tabs.missions, Routes.tabs.map, Routes.tabs.profile]

const PathToTabIndex = path => TabOrder.findIndex(s => s === path)

const TabIndexToPath = index => TabOrder[index]

export default function TabsScreen () {
  const location = useLocation()
  const [tabValue, setTabValue] = React.useState(PathToTabIndex(location.pathname))
  const history = useHistory()

  const handleChange = (_, newValue) => {
    history.push(TabIndexToPath(newValue))
    setTabValue(newValue)
  }

  return (
    <main className={style.main}>
      <Header />
      <Switch>
        <Route component={Map} path={Routes.tabs.map} />
        <Route component={Missions} path={Routes.tabs.missions} />
        <Route component={Profile} path={Routes.tabs.profile} />
        <Route component={Stickers} path={Routes.tabs.stickers} />
      </Switch>
      <footer className={style.footer}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          variant='fullWidth'
          className='w-full'
        >
          <Tab icon={<BookIcon />} />
          <Tab icon={<HomeIcon />} />
          <Tab icon={<PersonIcon />} />
        </Tabs>
      </footer>
    </main>
  )
}
