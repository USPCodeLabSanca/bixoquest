import React from 'react'

import Paper from '@material-ui/core/Paper'
import ArrowDown from '@material-ui/icons/ArrowDropUp'
import ArrowUp from '@material-ui/icons/ArrowDropDown'

const style = {
  root: 'h-full px-4 bg-gray-400 overflow-auto'
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
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 31
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 4
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 5
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 6
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 7
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 8
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 9
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 10
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 11
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 12
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 13
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 14
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 15
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 16
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 17
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 18
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 19
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 20
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 21
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 22
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 23
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 24
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 25
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 26
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 27
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 28
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 29
  },
  {
    title: 'A PRIMEIRA DE MUITAS [1/4]',
    description: 'Faça check-in no auditório antes de entrar nas aulas introdutórias',
    status: 'finished',
    endTime: '20/03/2020 23:55',
    id: 30
  }
]

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
  return (
    <div className={style.root}>
      {MissionsData.map(mission => <MissionCard mission={mission} key={mission.id} />)}
    </div>
  )
}
