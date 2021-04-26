import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, CircularProgress } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';

import Modal from '../modal';
import { closeModal } from '../../redux/actions/modal';
import { addFriend as addFriendAction } from '../../redux/actions/friends';
import CharacterRenderer from '../character-renderer';
import routes from '../../constants/routes';

const style = {
	root: 'flex justify-center items-center',
	card:
		'bg-white shadow-md container mx-auto max-w-lg lg:rounded text-center max-h-full overflow-auto',
	modalTitle: 'bg-gray-800 text-xl text-white py-4 px-8',
	info: 'text-md',
	gridInfo: 'grid grid-rows-2 grid-flow-col gap-4',
	gridCol1: 'col-span-10 row-span-2 p-8',
	gridCol2: 'col-span-1 row-span-2 pr-8 py-8',
	buttonContainer: 'w-full px-8 pb-8',
};

export default function UserProfileModal({ user }) {
	const friends = useSelector(state => state.auth.user.friends);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = React.useState(false);
	const history = useHistory();

	const isFriend = friends.includes(user._id);

	function handleClose() {
		dispatch(closeModal());
	}

	async function addFriend() {
		setIsLoading(true);
		try {
			dispatch(await addFriendAction(user._id));
		} catch (error) {
			console.log(error);
		} finally {
			handleClose();
			setIsLoading(false);
		}
	}

	function handleDonate() {
		history.push(routes.giveCards.replace(':id', user._id));
		dispatch(closeModal());
	}

	function handleDonateSpecial() {
		history.push(routes.giveSpecialCards.replace(':id', user._id));
		dispatch(closeModal());
	}

	return (
		<>
			<Modal open className={style.root} onClose={handleClose}>
				<div className={style.card}>
					<div className={style.modalTitle}>{user.name}</div>
					<div style={{ height: 300 }}>
						<CharacterRenderer charParts={user.character} />
					</div>
					<div className={style.gridInfo}>
						<div className={style.gridCol1}>
							<div className={style.info}>
								Curso: <b>{user.course}</b>
							</div>
							<div className={style.info}>
								Discord tag: <b>{user.discord}</b>
							</div>
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
					<div className={style.buttonContainer}>
						<Button
							color="primary"
							variant="contained"
							fullWidth
							style={{ marginBottom: 8 }}
							onClick={handleDonate}
						>
							Doar cartas
						</Button>
						<Button
							color="primary"
							variant="contained"
							fullWidth
							style={{ marginBottom: 8 }}
							onClick={handleDonateSpecial}
						>
							Doar cartas especiais
						</Button>
						<Button variant="contained" color="secondary" fullWidth onClick={handleClose}>
							Ok
						</Button>
					</div>
				</div>
			</Modal>
			<Backdrop style={{ zIndex: 9999999 }} open={isLoading}>
				<CircularProgress size={50} style={{ color: 'white' }} />
			</Backdrop>
		</>
	);
}
