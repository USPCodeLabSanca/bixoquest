import React, { useState, useEffect } from 'react'



import Paper from '@material-ui/core/Paper'
import ArrowDown from '@material-ui/icons/ArrowDropUp'
import ArrowUp from '@material-ui/icons/ArrowDropDown'

const style = {
  root: 'h-full px-4 overflow-auto'
}

const axios = require('axios')


const cardStyle = {
  root: 'pt-2 my-6',
  titleContainer: 'flex mx-4 justify-between font-bold',
  description: 'text-xs my-1 mx-4',
  statusContainer: 'flex',
  statusTime: 'flex justify-center items-center w-full text-xs text-center flex-col',
  statusText: 'flex justify-center items-center w-full text-xs text-center rounded-br-lg text-white',
  statusFinished: 'bg-tertiary'
}


const MissionCard = ({ mission }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const ArrowComponent = isOpen ? ArrowUp : ArrowDown

  return (
    <Paper className={cardStyle.root} elevation={3}>
      <div className={cardStyle.titleContainer} onClick={() => setIsOpen(s => !s)}>
        <h2>{mission.title}</h2>
        <ArrowComponent />
      </div>
      {
        isOpen ? (
          <>
            <p className={cardStyle.description}>{mission.description}</p>
            <div className={cardStyle.statusContainer}>
              <div className={cardStyle.statusTime}>
                <span className='font-bold'>Terminou em:</span>
                <span>{mission.endTime}</span>
              </div>
              <div className={cardStyle.statusText + ' ' + (mission.status === 'finished' ? cardStyle.statusFinished : '')}>
                {mission.status === 'finished' ? 'Concluida' : 'Em progresso'}
              </div>
            </div>
          </>
        ) : (
          // This is just to serve as a 'margin' when the component is closed
          <div className='h-2' />
        )
      }
    </Paper>
  )
}


export default function Missions () {

  const [missions, setMissions] = useState([])

  useEffect(() => {
    
    axios.get('http://localhost:8080/missions/all')
    .then(res => {
      const received = res.data
      
      setMissions(received.data)
    })

  },[])
  

  return (
    <div className={style.root}>
      {missions.map((mission) => <MissionCard mission={mission} key={mission.id} /> )}
    </div>
  )
}

