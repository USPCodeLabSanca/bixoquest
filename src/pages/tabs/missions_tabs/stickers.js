import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import STICKERS_DATA from '../../../constants/stickers'

import PropTypes from 'prop-types'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'

const style = {
  root: 'h-full overflow-auto',
  nav: 'flex space-between shadow-lg w-full bg-white',
  center: 'flex justify-center',
  avatar: { width: '80vw', height: 'auto', marginBottom: '8px', borderRadius: '8px' },
  avatarClass: 'shadow-lg'
}

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps (index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`
  }
}

export default function Stickers () {

  const user = useSelector(state => state.auth.user)
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={style.root}>
      <nav className={style.nav}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons='on'
          aria-label='scrollable force tabs example'
        >

          {user.stickers.map((sticker_id, index) => <Tab label={index + 1} key={index} {...a11yProps(index)} />)}

        </Tabs>

      </nav>

      <div className={style.center}>

        {
          user.stickers.map(
            (sticker_id, index) =>
              <TabPanel value={value} index={index} key={index}>
                <Avatar variant='square' style={style.avatar} className={style.avatarClass} src={STICKERS_DATA[sticker_id]}>
                  Sticker
                </Avatar>
              </TabPanel>
          )
        }

      </div>

    </div>
  )
}
