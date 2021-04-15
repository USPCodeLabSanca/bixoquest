import React from 'react';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';

import Modal, { ModalActions } from '../modal';
import { completeLocationMission } from '../../redux/actions/missions';
import { useDispatch } from 'react-redux';

const style = {
  root: 'flex justify-center items-center',
  card: 'bg-white shadow-md container mx-auto max-w-lg lg:rounded text-center',
	modalTitle: 'bg-gray-800 text-xl text-white p-4',
	title: 'text-lg p-8',
	description: 'text-xs px-8',
	locationReference: 'p-8',
	buttonContainer: 'w-full px-8 pb-8',
};

export default function MissionDialog({ onRequestClose = () => {}, mission, user }) {
	const [isLoading, setIsLoading] = React.useState(false);
	const dispatch = useDispatch();
	if (!mission) throw new Error('Mission prop is required');

	async function submit() {
		setIsLoading(true);
		try {
			if (!user.position) throw new Error('how are you here without a geolocation?');
			const latitude = user.position[0];
			const longitude = user.position[1];
			const action = await completeLocationMission(mission, latitude, longitude);
			dispatch(action);
			dispatch(ModalActions.closeModal());
			toast.success('Missão concluida com sucesso');
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	}

	function close() {
		if (isLoading) return;
		dispatch(ModalActions.closeModal());
	}

	return (
		<Modal open className={style.root} onClose={close}>
			<div className={style.card}>
				<div className={style.modalTitle}>Missão Concluída</div>
				<div className={style.title}>{mission.title}</div>
				<div className={style.description}>{mission.description}</div>
				<div className={style.locationReference}>{mission.locationReference}</div>
        <div className={style.buttonContainer}>
          <Button variant="contained" color="secondary" fullWidth onClick={submit}>
            Ok
            {isLoading && <CircularProgress style={{ margin: '0 8px', color: 'black' }} size={20} />}
          </Button>
				</div>
			</div>
		</Modal>
	);
}
