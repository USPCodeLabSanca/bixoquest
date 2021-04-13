import React from 'react';
import { useMultistep } from '../../../components/multistep-form/context';
import CharacterEditor from '../../../components/character-editor';
import { signup as signupAction } from '../../../redux/actions/auth';
import { Button, CircularProgress } from '@material-ui/core';
import { useDispatch } from 'react-redux';

const classes = {
	title: 'text-xl pb-8',
	buttonsContainer: 'flex w-full pt-8 gap-x-8 justify-around',
};

function SignupCharacterSelect() {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = React.useState(false);
	const { prevStage, updateFormValue, formValue } = useMultistep();

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

	async function handleSubmit() {
		if (isLoading) return;

		const data = { character };
		setIsLoading(true);
		try {
			dispatch(await signupAction({ ...formValue, ...data }));
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
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
				<Button fullWidth variant="contained" onClick={prevStage}>
					Voltar
				</Button>
				<Button fullWidth variant="contained" color="secondary" onClick={handleSubmit}>
					Criar{' '}
					{isLoading && <CircularProgress size={16} style={{ color: 'white', marginLeft: 8 }} />}
				</Button>
			</div>
		</div>
	);
}

export default SignupCharacterSelect;
