import React from 'react'

import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Routes from '../../../constants/routes'

import Missions from './missions'
import Stickers from './stickers'

const style = {
  wrapper: 'h-full flex flex-col justify-between bg-gray-400',
  nav: 'flex space-between shadow-lg w-full bg-white'
}

const TabOrder = [Routes.tabs.missionsTabs.missions, Routes.tabs.missionsTabs.stickers]

const PathToTabIndex = path => TabOrder.findIndex(s => s === path)

const TabIndexToPath = index => TabOrder[index]

export default function NavScreen () {
  const location = useLocation()
  const [tabValue, setTabValue] = React.useState(PathToTabIndex(location.pathname))
  const history = useHistory()

  const handleChange = (_, newValue) => {
    history.push(TabIndexToPath(newValue))
    setTabValue(newValue)
  }

  return (
    <div className='w-full h-full'>
      <nav className={style.nav}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          variant='fullWidth'
          className='w-full'
        >
          <Tab label='Missões' />
          <Tab label='Livro' />
        </Tabs>
      </nav>
      <Switch>
        <Route component={Missions} path={Routes.tabs.missionsTabs.missions} />
        <Route component={Stickers} path={Routes.tabs.missionsTabs.stickers} />
      </Switch>
    </div>
  )
}
