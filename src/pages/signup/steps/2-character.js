import React from 'react';
import { useMultistep } from '../../../components/multistep-form/context';
import CharacterEditor from '../../../components/character-editor';
import { Button } from '@material-ui/core';

const classes = {
	title: 'text-xl pb-8',
	buttonsContainer: 'flex w-full pt-8 justify-around',
};

function SignupCharacterSelect() {
	const { prevStage, updateFormValue, submit, formValue } = useMultistep();

	const character = formValue.character || {
		skin: 0,
		cheek: 0,
		clothBottom: 0,
		clothTop: 0,
		eyes: 0,
		feet: 0,
		hair: 0,
		mouth: 0,
	};

	function handleCharUpdate(character) {
		updateFormValue({ character });
	}

	function handleSubmit() {
		const data = { character };
		updateFormValue(data);
		submit();
	}

	return (
		<div>
			<h1 className={classes.title}>Crie o seu personagem</h1>
			{React.useMemo(
				() => (
					<CharacterEditor initialCharacter={character} onChange={handleCharUpdate} />
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
