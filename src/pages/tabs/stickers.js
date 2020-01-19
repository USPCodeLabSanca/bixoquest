import React from 'react'

import PropTypes from 'prop-types'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar';


const style = {

  root: 'h-full overflow-auto',
  nav: 'flex space-between shadow-lg w-full bg-white',
  center: 'flex justify-center',
  avatar: { width: '90vw', height: 'auto', marginBottom: '8px', borderRadius: '8px' },
  avatarClass: 'shadow-lg'

}

const StickersData = [
  {
    sticker_url: 'http://place-puppy.com/200x200',
    id: 1
  },
  {
    sticker_url: 'http://place-puppy.com/200x300',
    id: 2
  },
  {
    sticker_url: 'http://place-puppy.com/200x400',
    id: 3
  },
  {
    sticker_url: 'http://place-puppy.com/200x500',
    id: 4
  },
  {
    sticker_url: 'http://place-puppy.com/200x600',
    id: 5
  },
]

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  }
}

export default function Stickers () {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <div className={style.root}>
      <nav className={style.nav}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >

          {StickersData.map((sticker, index) => <Tab label={ index+1 } key={ index } {...a11yProps(index)}  />)}

        </Tabs>
        
      </nav>

      <div className={style.center}>

        { StickersData.map(
          (sticker, index) => 
          <TabPanel value={ value } index={ index } key={ index }> 
            <Avatar variant="square" style={ style.avatar } className={ style.avatarClass } src={ sticker.sticker_url }>
              Sticker
            </Avatar> 
          </TabPanel>
        )}

      </div>

    </div>
  )
}
