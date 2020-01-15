import React from 'react'

import Modal from '@material-ui/core/Modal'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'

const style = {
  root: 'flex justify-center items-center p-4',
  card: 'w-full',
  title: 'text-center bg-gray-700 text-3xl text-white px-2',
  description: 'text-center flex justify-center py-8'
}

export default function MissionDialog ({
  onRequestClose = () => {},
  onSubmit = () => {},
  mission
}) {
  if (!mission) throw new Error('Mission prop is required')

  return (
    <Modal open className={style.root} onClose={onRequestClose}>
      <Card className={style.card}>
        <div className={style.title}>Nova missão encontrada.</div>
        <div className={style.description}>{mission.location_reference}</div>
        <Button onClick={onSubmit} className={style.button} fullWidth variant='contained'>
          ACEITAR
        </Button>
      </Card>
    </Modal>
  )
}
