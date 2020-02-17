import React, { useState, useEffect } from 'react'

import Moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import ArrowDown from '@material-ui/icons/ArrowDropUp'
import ArrowUp from '@material-ui/icons/ArrowDropDown'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { completeKeyMission } from '../../../redux/actions/missions'
import API from '../../../api'
import { correctAllMissionCoords } from '../../../lib/coords-corrector'
import { toast } from 'react-toastify'

const style = {
  root: 'h-full px-4 overflow-auto',
  spinner: 'w-full justify-center flex my-8'
}

const cardStyle = {
  root: 'pt-2 my-6',
  titleContainer: 'flex mx-4 justify-between font-bold cursor-pointer no-touch-highligh',
  detailsContainer: 'overflow-hidden transition',
  description: 'text-xs my-1 mx-4',
  statusContainer: 'flex',
  statusTime: 'flex justify-center items-center w-full text-xs text-center flex-col',
  statusText: {
    base: 'flex justify-center items-center w-full text-xs text-center rounded-br text-white',
    finished: 'bg-tertiary',
    progress: 'bg-primary',
    expired: 'bg-red-600',
    soon: 'bg-yellow-400'
  }
}

const MissionCard = ({ mission }) => {
  const [detailsHeight, setDetailsHeight] = React.useState('6px')
  const [isSendingPassword, setIsSendingPassword] = React.useState(false)
  const isOpen = detailsHeight !== '6px'
  const detailsRef = React.useRef()
  const passwordRef = React.useRef()
  const ArrowComponent = isOpen ? ArrowUp : ArrowDown
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const startDate = Moment(mission.available_at)
  const expirationDate = Moment(mission.expirate_at)
  if (!user.completed_missions) user.completed_missions = []
  const hasMissionBeenCompleted = user.completed_missions.some(id => mission._id === id)
  const isMissionExpired = Moment().isAfter(expirationDate)
  const hasMissionStarted = Moment().isAfter(startDate)

  function resolveStatusText () {
    if (hasMissionBeenCompleted) return 'Concluída'
    else if (isMissionExpired) return 'Expirada'
    else if (!hasMissionStarted) return 'Em breve...'
    else return 'Em progresso'
  }

  function resolveStatusStyle () {
    const baseStyle = cardStyle.statusText.base
    let statusStyle
    if (hasMissionBeenCompleted) statusStyle = cardStyle.statusText.finished
    else if (isMissionExpired) statusStyle = cardStyle.statusText.expired
    else if (!hasMissionStarted) statusStyle = cardStyle.statusText.soon
    else statusStyle = cardStyle.statusText.progress
    return baseStyle + ' ' + statusStyle
  }

  function toggle () {
    if (isOpen) {
      setDetailsHeight('6px')
    } else {
      detailsRef.current.style.height = ''
      const height = detailsRef.current.clientHeight
      detailsRef.current.style.height = '6px'
      setTimeout(() => setDetailsHeight(height + 'px'), 10)
    }
  }

  function renderPassword () {
    if (mission.type !== 'key' || hasMissionBeenCompleted) return null

    async function sendPassword () {
      const password = passwordRef.current.value.trim().toLowerCase()
      if (!password) return toast.error('Você deve fornecer uma senha')
      try {
        setIsSendingPassword(true)
        const action = await completeKeyMission(mission, password)
        dispatch(action)
        toast.success('Senha correta!')
        toggle()
      } catch (e) { console.log(e) } finally {
        setIsSendingPassword(false)
      }
    }

    if (isMissionExpired) return null
    if (!hasMissionStarted) return null
    return (
      <>
        <p className={cardStyle.description + ' mt-4'}>
          Esta é uma missão de senha. Insira a senha correta para completar-la
        </p>
        <div className='mx-4 mb-4'>
          <div className='my-2'>
            <TextField variant='standard' fullWidth inputRef={passwordRef} />
          </div>
          <Button variant='contained' fullWidth onClick={sendPassword} color='secondary'>
            enviar {isSendingPassword && <CircularProgress size={15} style={{ marginLeft: '8px', color: 'white' }} />}
          </Button>
        </div>
      </>
    )
  }

  return (
    <Paper className={cardStyle.root} elevation={3}>
      <div className={cardStyle.titleContainer} onClick={toggle}>
        <h2>{mission.title}</h2>
        <ArrowComponent />
      </div>
      <div ref={detailsRef} className={cardStyle.detailsContainer} style={{ height: detailsHeight }}>
        <p className={cardStyle.description}>
          {mission.description}
        </p>
        {renderPassword()}
        <div className={cardStyle.statusContainer}>
          <div className={cardStyle.statusTime}>
            <span className='font-bold'>
              {isMissionExpired ? 'Terminou' : 'Termina'} em:
            </span>
            <span>{expirationDate.format('DD/MM/YYYY - HH[h] mm[m]')}</span>
          </div>
          <div className={resolveStatusStyle()}>
            {resolveStatusText()}
          </div>
        </div>
      </div>
    </Paper>
  )
}

export default function Missions () {
  const [missions, setMissions] = useState()
  const [isLoadingMissions, setIsLoadingMissions] = useState(true)

  useEffect(() => {
    (async () => {
      setIsLoadingMissions(true)
      try {
        const { data: { data: missions } } = await API.getAllMissions()
        correctAllMissionCoords(missions)
        setMissions(missions)
      } catch (e) { console.error(e) } finally {
        setIsLoadingMissions(false)
      }
    })()
  }, [])

  function renderMissions () {
    if (isLoadingMissions) {
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
