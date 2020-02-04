import React from 'react'

import Close from '@material-ui/icons/Close'
import ChevronRight from '@material-ui/icons/ChevronRight'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import Button from '@material-ui/core/Button'
import Spinner from '@material-ui/core/CircularProgress'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import QrCodeGen from 'qrcode.react'

const style = {
  root: 'w-full h-full p-4 bg-primary flex flex-col',
  header: 'w-full h-8 flex justify-between text-white items-center uppercase font-bold mb-8',
  headerText: 'w-full text-center absolute left-0',
  backArrowContainer: 'z-10 w-16 h-16 rounded-full flex justify-center items-center absolute left-0',
  main: 'h-full overflow-auto',
  footer: 'flex',
  footerButtonContainer: 'px-2 w-full h-full',
  prevButton: { width: '100%', justifySelf: 'flex-start' },
  nextButton: { width: '100%', justifySelf: 'flex-end' }
}

const selectStyle = {
  root: 'w-full h-24 flex items-center shadow-xl bg-gray-400 my-4',
  image: 'h-full w-16 flex justify-center items-center border bg-white',
  controlsContainer: 'flex flex-col h-full w-full items-center justify-between pl-2 pr-4',
  controlsInnerContainer: 'flex h-full w-full justify-center items-center relative',
  multiplier: 'self-start text-3xl',
  title: 'text-white text-center text-xl'
}

const confirmStyle = {
  root: 'h-full w-full flex flex-wrap content-start',
  cardContainer: 'flex mx-4 my-2 h-content',
  image: 'w-16 h-24 bg-white flex justify-center items-center text-center',
  multiplier: 'flex flex-col justify-end items-center text-white px-2',
  title: 'text-white text-center text-xl w-full h-content'
}

const codeStyle = {
  root: 'h-full w-full py-4',
  container: 'h-full w-full flex justify-center items-center',
  code: {
    width: '100%',
    height: '100%'
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
    <div className={selectStyle.root}>
      <div className={selectStyle.image}>{stickerId}</div>
      <div className={selectStyle.controlsContainer}>
        <div className={selectStyle.controlsInnerContainer} style={{ top: 22 }}>
          <ChevronLeft fontSize='large' onClick={down} />
          <div className='px-4 text-2xl'>{amountSelected}</div>
          <ChevronRight fontSize='large' onClick={up} />
        </div>
        <div className={selectStyle.multiplier}>{amountText}</div>
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
      await new Promise(resolve => setTimeout(resolve, 1000))
      const token = 'Oi jorginho, eu sou o dolynho, o seu amiguinho'
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
        <QrCodeGen value={token} size={window.innerWidth - 32} />
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

const CardsDB = [0, 0, 0, 0, 4, 2, 5, 7, 7, 10, 32, 21, 12]
const SELECT_STEP = 0
const CONFIRM_STEP = 1
const SCAN_STEP = 2

function GiveCards () {
  const history = useHistory()
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
    CardsDB.forEach(card => { uniquedCards[card] = (uniquedCards[card] || 0) + 1 })
    return (
      <div>
        <div className={selectStyle.title}>Selecione as cartas que você quer compartilhar</div>
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
      <QrCode selectedCards={selectedCards} />
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
        <div className={style.backArrowContainer} onClick={leaveScreen}>
          <Close />
        </div>
        <div className={style.headerText}>Compartilhar cartas</div>
      </header>
      <main className={style.main}>
        {contentRenderer()}
      </main>
      <footer className={style.footer}>
        <div className={style.footerButtonContainer}>
          {step > 0 && <Button style={style.prevButton} onClick={prevStep} variant='contained'>Voltar</Button>}
        </div>
        <div className={style.footerButtonContainer}>
          {step < 2 && <Button style={style.nextButton} onClick={nextStep} variant='contained'>Continuar</Button>}
        </div>
      </footer>
    </div>
  )
}

export default GiveCards
