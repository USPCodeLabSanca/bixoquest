import React from 'react'

import QrReader from 'react-qr-reader'
import Close from '@material-ui/icons/Close'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import JWTDecode from 'jwt-decode'
import API from '../api'

const style = {
  root: 'w-full h-full flex flex-col',
  header: 'w-full h-12 flex justify-end text-white items-center uppercase font-bold mb-8 bg-gray-100 shadow-lg',
  scanTitle: 'text-xl text-center px-4 py-4',
  headerButton: 'w-16 h-full justify-center items-center flex',
  backArrowContainer: 'z-10 w-16 h-16 rounded-full flex justify-center items-center absolute left-0',
  main: 'h-full overflow-auto',
  footer: 'flex',
  footerButtonContainer: 'p-2 w-full h-full',
  prevButton: { width: '100%', justifySelf: 'flex-start' },
  nextButton: { width: '100%', justifySelf: 'flex-end' }
}

function QrCodeScan () {
  const [isSendingCode, setIsSendingCode] = React.useState(false)
  const [qrCodeBackendResponse, setQrCodeBackendResponse] = React.useState(null)
  const [qrCodePayload, setQrCodePayload] = React.useState(null)
  const history = useHistory()

  function error () {
    toast.error('Erro ao tentar abrir a câmera')
    history.goBack()
  }

  async function onScan (token) {
    if (!token || isSendingCode || qrCodeBackendResponse) return
    setIsSendingCode(true)
    try {
      const { data: payload } = await API.sendQrCodeToken(token)
      setQrCodeBackendResponse(payload)
      setQrCodePayload(JWTDecode(token))
    } catch (e) { console.error(e) } finally {
      setIsSendingCode(false)
    }
  }

  function leaveScreen () {
    history.goBack()
  }

  function renderDonation () {
    console.log(qrCodeBackendResponse, qrCodePayload)
    return null
  }

  function renderMissionCompletetion () {
    return null
  }

  function renderQrCodeReader () {
    return (
      <div>
        <h1 className={style.scanTitle}>Leia um QrCode de missão ou de doação para prosseguir</h1>
        <QrReader
          delay={300}
          style={{ width: '100%' }}
          onError={error}
          onScan={onScan}
        />
      </div>
    )
  }

  function renderContent () {
    if (!qrCodeBackendResponse) {
      return renderQrCodeReader()
    } else if (qrCodeBackendResponse.donatorName) {
      return renderDonation()
    } else {
      return renderMissionCompletetion()
    }
  }

  return (
    <div className={style.root}>
      <header className={style.header}>
        <div className={style.headerButton} onClick={leaveScreen}>
          <Close fontSize='large' style={{ color: 'black' }} />
        </div>
      </header>
      <main className={style.main}>
        {renderContent()}
      </main>
    </div>
  )
}

export default QrCodeScan
