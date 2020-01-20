import React from 'react'

import Modal from '@material-ui/core/Modal'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import API from '../../api'

const style = {
  root: 'flex justify-center items-center p-4',
  card: 'w-full',
  title: 'text-center bg-gray-700 text-3xl text-white px-2',
  description: 'text-center flex justify-center py-8'
}

export default function MissionDialog ({
  onRequestClose = () => {},
  mission
}) {
  const [isLoading, setIsLoading] = React.useState(false)
  if (!mission) throw new Error('Mission prop is required')

  async function submit () {
    setIsLoading(true)
    try {
      await API.completeMission(mission._id, mission.lat, mission.lng)
      onRequestClose()
    } catch (e) { console.error(e) } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal open className={style.root} onClose={onRequestClose}>
      <Card className={style.card}>
        <div className={style.title}>Nova missão encontrada.</div>
        <div className={style.description}>{mission.location_reference}</div>
        <Button onClick={submit} className={style.button} fullWidth variant='contained'>
          ACEITAR
          {isLoading && <CircularProgress style={{ margin: '0 8px', color: 'black' }} size={20} />}
        </Button>
      </Card>
    </Modal>
  )
}
