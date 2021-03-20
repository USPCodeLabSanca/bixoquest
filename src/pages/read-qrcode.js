import React from 'react'

import Close from '@material-ui/icons/Close'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import JWTDecode from 'jwt-decode'
import CircularProgress from '@material-ui/core/CircularProgress'
import API from '../api'
import StickersImages from '../constants/stickers'
import Routes from '../constants/routes'
import { Button } from '@material-ui/core'
import { receiveDonation } from '../redux/actions/stickers'
import { completeQRCodeMission } from '../redux/actions/missions'
import { useDispatch } from 'react-redux'

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
  const dispatch = useDispatch()
  const history = useHistory()

  function error () {
    toast.error('Erro ao tentar abrir a câmera.')
    history.goBack()
  }

  async function onScan (token) {
    if (!token || isSendingCode || qrCodeBackendResponse) return
    setIsSendingCode(true)
    const payload = JWTDecode(token)
    setQrCodePayload(payload)
    try {
      const { data: { data: response } } = await API.sendQrCodeToken(token)
      setQrCodeBackendResponse(response)
      if (payload.isMission === false) dispatch(receiveDonation(payload.stickers))
      else if (payload.isMission === true) {
        dispatch(completeQRCodeMission(response))
        toast.success('Missão completada com sucesso!')
        history.push(Routes.tabs.map)
      }
      else return toast.error('Você deve ler um QRCode gerado pela organização do BixoQuest!')
    } catch (e) { console.error(e) } finally {
      setIsSendingCode(false)
    }
  }

  function leaveScreen () {
    history.goBack()
  }

  function renderDonation () {
    const donatedCards = qrCodePayload.stickers
    const uniquedCards = {}
    donatedCards.forEach(card => { uniquedCards[card] = (uniquedCards[card] || 0) + 1 })
    const Sticker = ({ stickerId, amount }) => (
      <div className='flex mx-4 my-2 h-content'>
        <div className='w-16 h-24 bg-gray-500 flex items-end' style={{backgroundImage: `url(${StickersImages.stickers[stickerId]})`, backgroundSize: 'cover' }}>{stickerId}</div>
        <div className='flex flex-col justify-end items-center px-2'>x{amount}</div>
      </div>
    )
    return (
      <div className='h-full w-full flex flex-wrap content-start'>
        <h1 className={style.scanTitle}>Você recebeu uma doação de {qrCodeBackendResponse.donatorName}</h1>
        {Object.entries(uniquedCards).map(([stickerId, amount]) =>
          <Sticker
            amount={amount}
            stickerId={stickerId}
            key={stickerId}
          />
        )}
      </div>
    )
  }

  function renderMissionCompletetion () {
    console.log(qrCodeBackendResponse, qrCodePayload)
    return null
  }

  function renderQrCodeReader () {
    return (
      <div>
        <h1 className={style.scanTitle}>Leia um QRCode de missão ou de doação para prosseguir.</h1>
        {/* <QrReader
          delay={300}
          style={{ width: '100%' }}
          onError={error}
          onScan={onScan}
        /> */}
      </div>
    )
  }

  function renderContent () {
    if (isSendingCode) {
      return (
        <div className='w-full h-full flex justify-center items-center'>
          <CircularProgress size={50} style={{ color: 'black' }} />
        </div>
      )
    } else if (qrCodeBackendResponse) {
      if (qrCodePayload.isMission) {
        return renderMissionCompletetion()
      } else {
        return renderDonation()
      }
    } else if (qrCodePayload) {
      return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <h1 className='text-xl p-4 text-center'>Houve um erro ao ler este QRCode.</h1>
          <Button variant='contained' onClick={() => setQrCodePayload(null)}>
            Tentar novamente
          </Button>
        </div>
      )
    } else {
      return renderQrCodeReader()
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
