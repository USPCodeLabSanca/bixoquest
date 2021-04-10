import React from 'react';
import { useMultistep } from '../../../components/multistep-form/context';
import CharacterEditor from '../../../components/character-editor';
import { Button } from '@material-ui/core';

const classes = {
	title: 'text-xl pb-8',
	buttonsContainer: 'flex w-full pt-8 justify-around',
};

function SignupCharacterSelect() {
	const { prevStage, updateFormValue, submit } = useMultistep();

	const [currentChar, setCurrentChar] = React.useState({
		skin: 0,
		cheek: 0,
		clothBottom: 0,
		clothTop: 0,
		eyes: 0,
		feet: 0,
		hair: 0,
		mouth: 0,
	});

	/**
	 * Função chamada quando o usuário tentar ir para o próximo passo. Ela deve ser responsável
	 * por extrair e validar os dados do usuário.
	 */
	function handleSubmit() {
		// TODO - Ler esses dados do usuário
		const data = { characterModel: 'some-model-here' };

		updateFormValue(data);
		submit();
	}

	return (
		<div>
			<h1 className={classes.title}>Crie o seu personagem</h1>
			{React.useMemo(
				() => (
					<CharacterEditor onChange={setCurrentChar} />
				),
				[],
			)}
			<div className={classes.buttonsContainer}>
				<Button variant="contained" onClick={prevStage}>
					Voltar
				</Button>
				<Button variant="contained" color="secondary" onClick={handleSubmit}>
					Criar
				</Button>
			</div>
		</div>
	);
}

export default SignupCharacterSelect;
