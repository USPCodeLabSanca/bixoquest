import React from 'react';

import Modal from '../modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/actions/modal';
import CharacterRenderer from '../character-renderer';
import { Button, CircularProgress } from '@material-ui/core';
import { addFriend as addFriendAction } from '../../redux/actions/friends';
import routes from '../../constants/routes';
import { useHistory } from 'react-router-dom';

const style = {
	root: 'flex justify-center items-center p-4',
	card: 'p-4 bg-white flex flex-col rounded-lg max-h-full overflow-auto max-w-md w-full',
	name: 'text-2xl text-center my-4',
	info: 'text-md',
	gridInfo: 'grid grid-rows-2 grid-flow-col gap-4',
	gridCol1: 'col-span-10 row-span-2',
	gridCol2: 'col-span-1 row-span-2',
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

	return (
		<Modal open className={style.root} onClose={handleClose}>
			<div className={style.card}>
				<div style={{ height: 300 }}>
					<CharacterRenderer charParts={user.character} />
				</div>
				<div className={style.name}>{user.name}</div>
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
								Adicionar amigo{' '}
								{isLoading && (
									<CircularProgress size={16} style={{ color: 'white', marginLeft: 8 }} />
								)}
							</Button>
						</div>
					)}
				</div>
				<Button
					color="primary"
					variant="contained"
					style={{ marginTop: 16 }}
					onClick={handleDonate}
				>
					Doar cartas
				</Button>
				<Button
					color="secondary"
					variant="contained"
					style={{ marginTop: 8 }}
					onClick={handleClose}
				>
					Ok
				</Button>
			</div>
		</Modal>
	);
}
