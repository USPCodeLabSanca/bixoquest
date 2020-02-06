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

  return (
    <Modal>
      <div className={style.root}>
      </div>
    </Modal>
  )
}

export default QrCodeReaderModal
