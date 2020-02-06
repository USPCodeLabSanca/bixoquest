import React from 'react'

import Close from '@material-ui/icons/Close'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import Button from '@material-ui/core/Button'
import Spinner from '@material-ui/core/CircularProgress'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import QrCodeGen from 'qrcode.react'
import { useSelector } from 'react-redux'
import API from '../api'

const style = {
  root: 'w-full h-full flex flex-col',
  header: 'w-full h-12 flex justify-end text-white items-center uppercase font-bold mb-8 bg-gray-100 shadow-lg',
  headerButton: 'w-16 h-full justify-center items-center flex',
  backArrowContainer: 'z-10 w-16 h-16 rounded-full flex justify-center items-center absolute left-0',
  main: 'h-full overflow-auto',
  footer: 'flex',
  footerButtonContainer: 'p-2 w-full h-full',
  prevButton: { width: '100%', justifySelf: 'flex-start' },
  nextButton: { width: '100%', justifySelf: 'flex-end' }
}

const selectStyle = {
  root: 'flex items-center shadow',
  image: 'flex justify-center items-center bg-gray-500',
  controlsContainer: 'flex h-full w-full items-center justify-between pl-2 pr-4',
  controlsInnerContainer: 'flex flex-col h-full justify-center items-center',
  amountSelectedText: 'text-2xl border border-black rounded-lg h-16 w-16 flex items-center justify-center',
  multiplier: 'text-3xl h-full flex flex-col justify-end items-end',
  title: 'text-center text-xl mb-4 px-4'
}

const confirmStyle = {
  root: 'h-full w-full flex flex-wrap content-start',
  cardContainer: 'flex mx-4 my-2 h-content',
  image: 'w-16 h-24 bg-gray-500 flex justify-center items-center text-center',
  multiplier: 'flex flex-col justify-end items-center px-2',
  title: 'text-center text-xl w-full h-content mb-4 px-4'
}

const codeStyle = {
  root: 'h-full w-full flex flex-col justify-between',
  title: 'text-center text-lg w-full h-content px-4',
  container: 'h-full w-full flex justify-center items-center',
  code: {
    position: 'absolute',
    zIndex: 99999
  }
}

function CardItemToSelect ({
  stickerId,
  amountOwned,
  onUp = () => {},
  onDown = () => {},
  amountSelected = 0
}) {
  function up () {
    if (amountSelected + 2 > amountOwned) {
      return toast.error('Você só pode doar cartas repetidas!')
    }
    onUp()
  }

  function down () {
    onDown()
  }

  const amountText = amountOwned > 1 ? 'x' + amountOwned : ''
  return (
    <div className={selectStyle.root} style={{ height: 151 }}>
      <div className={selectStyle.image} style={{ height: 151, width: 106.47 }}>
        {stickerId}
      </div>
      <div className={selectStyle.controlsContainer}>
        <div className={selectStyle.multiplier}>{amountText}</div>
        <div className={selectStyle.controlsInnerContainer} style={{ top: 22 }}>
          <KeyboardArrowUp fontSize='large' onClick={up} />
          <div className={selectStyle.amountSelectedText}>{amountSelected}</div>
          <KeyboardArrowDown fontSize='large' onClick={down} />
        </div>
      </div>
    </div>
  )
}

function CardItemToConfirm ({ stickerId, amount }) {
  return (
    <div className={confirmStyle.cardContainer}>
      <div className={confirmStyle.image}>{stickerId}</div>
      <div className={confirmStyle.multiplier}>x{amount}</div>
    </div>
  )
}

function QrCode ({ selectedCards }) {
  const [isFetchingToken, setIsFetchingToken] = React.useState(true)
  const [token, setToken] = React.useState(false)

  React.useEffect(() => {
    fetchToken()
  }, [])

  async function fetchToken () {
    setIsFetchingToken(true)
    try {
      const cards = []
      Object.entries(selectedCards).forEach(([id, amount]) => {
        for (let i = 0; i < amount; i++) cards.push(+id)
      })
      const { data: token } = await API.fetchDonationToken({ stickers: cards })
      setToken(token)
    } catch (e) { console.error(e) } finally {
      setIsFetchingToken(false)
    }
  }

  function renderCode () {
    if (isFetchingToken) return <Spinner size={30} style={{ color: 'black' }} />
    if (!token) {
      return (
        <div className='text-white text-center'>
          Houve um problema gerando o QrCode
          <Button variant='contained' onClick={fetchToken}>Tentar novamente</Button>
        </div>
      )
    } else {
      return (
        <QrCodeGen value={token} size={window.innerWidth - 32} style={codeStyle.code} />
      )
    }
  }

  return (
    <div className={codeStyle.root}>
      <div className={codeStyle.container}>
        {renderCode()}
      </div>
    </div>
  )
}

const SELECT_STEP = 0
const CONFIRM_STEP = 1
const SCAN_STEP = 2

function GiveCards () {
  const history = useHistory()
  const userStickers = useSelector(state => state.auth.user.stickers)
  const [selectedCards, setSelectedCards] = React.useState({})
  const [step, setStep] = React.useState(0)

  function selectCard (cardId) {
    const newCardValue = (selectedCards[cardId] || 0) + 1
    setSelectedCards({ ...selectedCards, [cardId]: newCardValue })
  }

  function unselectCard (cardId) {
    const newCardValue = Math.max(0, (selectedCards[cardId] || 0) - 1)
    setSelectedCards({ ...selectedCards, [cardId]: newCardValue })
  }

  function leaveScreen () {
    history.goBack()
  }

  function nextStep () {
    if (step === SELECT_STEP) {
      if (Object.values(selectedCards).length === 0) {
        return toast.error('Voce deve selecionar pelo menos uma carta para continuar')
      }
    }
    setStep(Math.min(2, step + 1))
  }

  function prevStep () { setStep(Math.max(0, step - 1)) }

  function renderSelectCards () {
    const uniquedCards = {}
    userStickers.forEach(card => { uniquedCards[card] = (uniquedCards[card] || 0) + 1 })
    return (
      <div>
        <div className={selectStyle.title}>Selecione as cartas que você quer doar</div>
        {
          Object.entries(uniquedCards)
            .filter(([id, amount]) => amount > 1)
            .map(([id, amount]) =>
              <CardItemToSelect
                stickerId={+id}
                amountOwned={+amount}
                amountSelected={selectedCards[id]}
                onUp={() => selectCard(id)}
                onDown={() => unselectCard(id)}
                key={id}
              />
            )
        }
      </div>
    )
  }

  function renderConfirmation () {
    return (
      <div className={confirmStyle.root}>
        <div className={confirmStyle.title}>Confira se essas são as cartas que você quer doar</div>
        {
          Object.entries(selectedCards).map(([id, amount]) =>
            <CardItemToConfirm key={id} stickerId={id} amount={amount} />
          )
        }
      </div>
    )
  }

  function renderQrCode () {
    return (
      <div className={codeStyle.root}>
        <div className={codeStyle.title}>A pessoa que receberá essa doação deve escanear esse QRCode através da funcionalidade de câmera do BixoQuest</div>
        <QrCode selectedCards={selectedCards} />
      </div>
    )
  }

  const contentRenderer = {
    [SELECT_STEP]: renderSelectCards,
    [CONFIRM_STEP]: renderConfirmation,
    [SCAN_STEP]: renderQrCode
  }[step]

  return (
    <div className={style.root}>
      <header className={style.header}>
        <div className={style.headerButton} onClick={leaveScreen}>
          <Close fontSize='large' style={{ color: 'black' }} />
        </div>
      </header>
      <main className={style.main}>
        {contentRenderer()}
      </main>
      <footer className={style.footer}>
        <div className={style.footerButtonContainer}>
          {step > 0 && <Button style={style.prevButton} onClick={prevStep} variant='contained'>Voltar</Button>}
        </div>
        <div className={style.footerButtonContainer}>
          {step < 2 && <Button style={style.nextButton} onClick={nextStep} variant='contained' color='secondary'>Continuar</Button>}
        </div>
      </footer>
    </div>
  )
}

export default GiveCards
