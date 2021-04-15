import React from 'react';

import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';

import { editProfile } from '../../redux/actions/auth';
import { closeModal } from '../../redux/actions/modal';
import Modal from '../modal';
import CharacterEditor from '../character-editor';
import { TextField } from '@material-ui/core';

const style = {
  root: 'flex justify-center items-center',
  card: 'bg-white shadow-md container mx-auto max-w-lg lg:rounded text-center max-h-full overflow-auto',
	modalTitle: 'bg-gray-800 text-xl text-white py-4 px-8',
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
				<div className={style.modalTitle}>Editar perfil</div>
				<div className="p-8">
					<TextField
						label="Discord tag"
						onChange={event => {
							updateNewUser({ discord: event.target.value });
						}}
						fullWidth
						defaultValue={user.discord}
					/>
				</div>
        <div className="px-8">
          <CharacterEditor
            initialCharacter={user.character}
            onChange={char => updateNewUser({ character: char })}
          />
        </div>
				<div className="p-8">
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
				<div className='px-8 pb-8'>
					<Button
						onClick={handleCancel}
						className={style.button}
						fullWidth
						variant="contained"
						size="small"
					>
						Cancelar
					</Button>
				</div>
			</div>
		</Modal>
	);
}
