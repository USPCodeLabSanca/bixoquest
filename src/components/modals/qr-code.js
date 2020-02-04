import React from 'react'
import QrReader from 'react-qr-reader'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { closeModal } from '../../redux/actions/modal'
import Modal from '../modal'

const style = {
  root: 'w-screen h-screen justify-center items-center flex'
}

function QrCodeReaderModal ({ onScan }) {
  const dispatch = useDispatch()

  function requestClose () {
    dispatch(closeModal())
  }

  function error () {
    toast.error('Erro ao tentar ler o QrCode')
    requestClose()
  }

  return (
    <Modal>
      <div className={style.root}>
        <QrReader
          delay={300}
          style={{ width: '100%' }}
          onError={error}
          onScan={onScan}
        />
      </div>
    </Modal>
  )
}

export default QrCodeReaderModal
