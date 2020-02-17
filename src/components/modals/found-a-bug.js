import React from 'react'

import Button from '@material-ui/core/Button'
import { useDispatch } from 'react-redux'

import { closeModal } from '../../redux/actions/modal'
import Modal from '../modal'

const style = {
  root: 'w-full h-full flex justify-center items-center p-4 py-16',
  card: 'p-4 bg-white rounded-lg max-h-full overflow-auto max-w-md',
  title: 'text-2xl',
  paragraph: 'my-4 text-justify'
}

const P = (props) => <p className={style.paragraph} {...props} />

function FoundABugModal () {
  const dispatch = useDispatch()

  function submit () {
    dispatch(closeModal())
  }

  return (
    <Modal className={style.root}>
      <div className={style.card}>
        <div className={style.title}>Encontrei um bug!</div>
        <div className={style.description}>
          <P>Oh não! Pedimos desculpas!</P>
          <P>
            O BixoQuest é um jogo feito com muito amor, e nós queremos que ele seja
            apreciado ao máximo. Por favor, ajude-nos a melhorar essa experiência
            reportando esse bug pada nós. Se ninguam falar nada, a gente nunca vai
            ficar sabendo!
          </P>
          <P>
            Mande um E-mail para uclsanca@icmc.com.br com o assunto '[Bug BixoQuest]'.
            Deixe uma breve descrição do seu bug na área de mensagem, e se você puder,
            um screenshot da sua tela.
          </P>
          <P>
            Agradecemos a sua colaboração, e vamos fazer o máximo para consertar isso
            o mais rápido o possivel!
          </P>
        </div>
        <Button onClick={submit} className={style.button} fullWidth variant='contained'>
          OK
        </Button>
      </div>
    </Modal>
  )
}

export default FoundABugModal
