import React from 'react';

import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';

import { editProfile } from '../../redux/actions/auth';
import { closeModal } from '../../redux/actions/modal';
import Modal from '../modal';
import CharacterEditor from '../character-editor';
import { TextField } from '@material-ui/core';

const style = {
	root: 'w-full h-full flex justify-center items-center p-4 py-16',
	card: 'p-4 bg-white gap-y-4 flex flex-col rounded-lg max-h-full overflow-auto max-w-md w-full',
	title: 'text-2xl text-center',
	buttonsContainer: 'flex flex-col mt-4 gap-2',
};

export default function EditProfileModal() {
	const user = useSelector(state => state.auth.user);
	const [newUser, setNewUser] = React.useState({ character: user.character });

	function updateNewUser(newData) {
		setNewUser(state => ({ ...state, ...newData }));
	}

	const dispatch = useDispatch();

	function handleCancel() {
		dispatch(closeModal());
	}

	async function handleSubmit() {
		dispatch(await editProfile(newUser));
		dispatch(closeModal());
	}

	return (
		<Modal className={style.root}>
			<div className={style.card}>
				<div className={style.title}>Editar perfil</div>
				<TextField
					label="Discord tag"
					onChange={event => {
						updateNewUser({ discord: event.target.value });
					}}
					fullWidth
					defaultValue={user.discord}
				/>
				<CharacterEditor
					initialCharacter={user.character}
					onChange={char => updateNewUser({ character: char })}
				/>
				<div className={style.buttonsContainer}>
					<Button onClick={handleCancel} className={style.button} fullWidth variant="contained">
						Cancelar
					</Button>
					<Button
						onClick={handleSubmit}
						color="secondary"
						className={style.button}
						fullWidth
						variant="contained"
					>
						Enviar
					</Button>
				</div>
			</div>
		</Modal>
	);
}
