import React from 'react'

import ArrowDown from '@material-ui/icons/ArrowDropUp'
import ArrowUp from '@material-ui/icons/ArrowDropDown'

const style = {
  root: 'h-full px-4 bg-gray-400'
}

const cardStyle = {
  root: 'w-full pt-2 bg-white rounded-lg my-6 shadow-lg',
  titleContainer: 'flex mx-4 justify-between font-bold',
  description: 'text-xs my-1 mx-4',
  statusContainer: 'flex',
  statusTime: 'flex justify-center items-center w-full text-xs text-center flex-col',
  statusText: 'flex justify-center items-center w-full text-xs text-center rounded-br-lg text-white',
  statusFinished: 'bg-tertiary'
}

// TODO - make a backend request instead of this
const MissionsData = [
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 1
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 2
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 3
  }
]

const MissionCard = ({ mission }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const ArrowComponent = isOpen ? ArrowUp : ArrowDown

  return (
    <div className={cardStyle.root}>
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
    </div>
  )
}

export default function Missions () {
  return (
    <div className={style.root}>
      {MissionsData.map(mission => <MissionCard mission={mission} key={mission.id} />)}
    </div>
  )
}
