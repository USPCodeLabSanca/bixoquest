import React from 'react';

import Modal from '../modal';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/actions/modal';
import CharacterRenderer from '../character-renderer';
import { Button } from '@material-ui/core';
import API from '../../api';

const style = {
	root: 'flex justify-center items-center p-4',
	card: 'p-4 bg-white flex flex-col rounded-lg max-h-full overflow-auto max-w-md w-full',
	name: 'text-2xl text-center my-4',
	info: 'text-md',
	gridInfo: 'grid grid-rows-2 grid-flow-col gap-4',
	gridCol1: 'col-span-10 row-span-2',
	gridCol2: 'col-span-1 row-span-2',
};

export default function UserProfileModal({ user, isFriend }) {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = React.useState(false);

	function handleClose() {
		dispatch(closeModal());
	}

	async function addFriend() {
		console.log(user)
		setIsLoading(true);
		try{
			await API.addFriend(user._id);
		}
		catch (error){
			console.log(error);
		}
		finally {
			handleClose();
			setIsLoading(false);
		}
	}

	return (
		<Modal open className={style.root} onClose={handleClose}>
			<div className={style.card}>
				<div style={{ height: 300 }}>
					<CharacterRenderer charParts={user.character} />
				</div>
				<div className={style.name}>{user.name}</div>
				<div className={style.gridInfo}>
					<div className={style.gridCol1}>
						<div className={style.info}>Curso: <b>{user.course}</b></div>
						<div className={style.info}>Discord tag: <b>{user.discord}</b></div>
					</div>
					{!isFriend && (
					<div className={style.gridCol2}>
						<Button
							color="primary"
							variant="contained"
							style={{ padding: 10 }}
							onClick={addFriend}
						>
							Adicionar amigo
						</Button>
					</div>
					)}
					
				</div>
				<Button
					color="secondary"
					variant="contained"
					style={{ marginTop: 16 }}
					onClick={handleClose}
				>
					Ok
				</Button>
			</div>
		</Modal>
	);
}
