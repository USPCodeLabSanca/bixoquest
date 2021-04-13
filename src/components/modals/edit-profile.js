import React from 'react';

import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';

import { editProfile } from '../../redux/actions/auth';
import { closeModal } from '../../redux/actions/modal';
import Modal from '../modal';
import CharacterEditor from '../character-editor';
import { TextField } from '@material-ui/core';

const style = {
	root: 'w-full h-full flex justify-center items-center p-4',
	card: 'p-4 bg-white max-h-full flex flex-col rounded overflow-auto max-w-md w-full shadow-md',
	title: 'text-xl text-center',
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
        <div className='py-4'>
          <TextField
            label="Discord tag"
            onChange={event => {
              updateNewUser({ discord: event.target.value });
            }}
            fullWidth
            defaultValue={user.discord}
          />
        </div>
				<CharacterEditor
					initialCharacter={user.character}
					onChange={char => updateNewUser({ character: char })}
				/>
				<div className='py-4'>
					<Button onClick={handleCancel} className={style.button} fullWidth variant="contained" size="small">
						Cancelar
					</Button>
				</div>
        <div>
					<Button
						onClick={handleSubmit}
						color="secondary"
						className={style.button}
						fullWidth
						variant="contained"
            size="small"
					>
						Enviar
					</Button>
				</div>
			</div>
		</Modal>
	);
}
