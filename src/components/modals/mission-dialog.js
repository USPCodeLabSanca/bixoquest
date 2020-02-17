import React from 'react'

import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { toast } from 'react-toastify'

import Modal, { ModalActions } from '../modal'
import { completeLocationMission } from '../../redux/actions/missions'
import { useDispatch, useSelector } from 'react-redux'

const style = {
  root: 'flex justify-center items-center p-4',
  card: 'w-full max-w-md',
  title: 'text-center bg-gray-700 text-3xl text-white px-2',
  description: 'text-center flex justify-center py-8'
}

export default function MissionDialog ({
  onRequestClose = () => {},
  mission
}) {
  const [isLoading, setIsLoading] = React.useState(false)
  const geolocation = useSelector(state => state.geolocation)
  const dispatch = useDispatch()
  if (!mission) throw new Error('Mission prop is required')

  async function submit () {
    setIsLoading(true)
    try {
      if (!geolocation) throw new Error('how are you here without a geolocation?')
      const { latitude, longitude } = geolocation.position.coords
      const action = await completeLocationMission(mission, latitude, longitude)
      // const action = await completeMission(mission, -22.007336, -47.895105)
      dispatch(action)
      dispatch(ModalActions.closeModal())
      toast.success('Missão concluida com sucesso')
    } catch (e) { console.error(e) } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal open className={style.root}>
      <Card className={style.card}>
        <div className={style.title}>Missão Concluida</div>
        <div className={style.description}>{mission.location_reference}</div>
        <Button onClick={submit} className={style.button} fullWidth variant='contained'>
          OK
          {isLoading && <CircularProgress style={{ margin: '0 8px', color: 'black' }} size={20} />}
        </Button>
      </Card>
    </Modal>
  )
}
