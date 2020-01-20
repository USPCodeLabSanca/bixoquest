import React, { useState, useEffect } from 'react'

import API from '../../../api'

import Paper from '@material-ui/core/Paper'
import ArrowDown from '@material-ui/icons/ArrowDropUp'
import ArrowUp from '@material-ui/icons/ArrowDropDown'
import CircularProgress from '@material-ui/core/CircularProgress'

const style = {
  root: 'h-full px-4 overflow-auto',
  spinner: 'w-full justify-center flex my-8'
}

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
  const [missions, setMissions] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      try {
        const { data: { data: missions } } = await API.getAllMissions()
        setMissions(missions)
      } catch (e) { console.error(e) } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  function renderMissions () {
    if (isLoading) {
      return (
        <div className={style.spinner}>
          <CircularProgress size={30} style={{ color: 'black' }} />
        </div>
      )
    } else if (!missions) {
      return <p>Ocorreu um erro. Por favor, tente novamente</p>
    } else if (missions.length === 0) {
      return <p>Nenhuma missão encontrada</p>
    } else {
      return missions.map(
        mission => <MissionCard mission={mission} key={mission._id} />
      )
    }
  }

  return (
    <div className={style.root}>
      {renderMissions()}
    </div>
  )
}
