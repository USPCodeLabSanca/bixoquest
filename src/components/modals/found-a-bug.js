import React from 'react';

import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';

import { closeModal } from '../../redux/actions/modal';
import Modal from '../modal';

const style = {
	root: 'flex justify-center items-center',
	card: 'bg-white shadow-md container mx-auto max-w-lg lg:rounded max-h-full overflow-auto',
  modalTitle: 'bg-gray-800 text-xl text-white py-4 px-8',
	description: 'py-4',
	paragraph: 'text-sm my-4 px-8 text-justify',
  buttonContainer: 'w-full px-8 pb-8',
};

const P = props => <p className={style.paragraph} {...props} />;

function FoundABugModal() {
	const dispatch = useDispatch();

	function submit() {
		dispatch(closeModal());
	}

	return (
		<Modal className={style.root}>
			<div className={style.card}>
				<div className={style.modalTitle}>Encontrei um bug!</div>
				<div className={style.description}>
					<P>Oh não! Pedimos desculpas!</P>
					<P>
						O BixoQuest é um jogo feito com muito amor, e nós queremos que ele seja apreciado ao
						máximo. Por favor, ajude-nos a melhorar essa experiência reportando esse bug pada nós.
						Se ninguam falar nada, a gente nunca vai ficar sabendo!
					</P>
					<P>
						Mande um E-mail para uclsanca@icmc.usp.br com o assunto '[Bug BixoQuest]'. Deixe uma
						breve descrição do seu bug na área de mensagem, e se você puder, um screenshot da sua
						tela.
					</P>
					<P>
						Agradecemos a sua colaboração, e vamos fazer o máximo para consertar isso o mais rápido
						o possivel!
					</P>
				</div>
        <div className={style.buttonContainer}>
          <Button variant="contained" color="secondary" fullWidth onClick={submit}>
            Ok
          </Button>
				</div>
			</div>
		</Modal>
	);
}

export default FoundABugModal;
