import React from 'react';

import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

import Modal, { ModalActions } from '../modal';
import { completeLocationMission } from '../../redux/actions/missions';

const style = {
	root: 'flex justify-center items-center',
	card:
		'bg-white shadow-md container mx-auto max-w-lg lg:rounded text-center max-h-full overflow-auto',
	modalTitle: 'bg-gray-800 text-xl text-white py-4 px-8',
	title: 'text-lg pt-8',
	description: 'text-xs px-8 pt-8',
	locationReference: 'text-sm px-8 pt-8',
	numberOfPacks: 'px-8 p-8',
	buttonContainer: 'w-full px-8 pb-8',
};

function Timer({ closeAt }) {
	const [secondsLeft, setSecondsLeft] = React.useState();

	React.useLayoutEffect(() => {
		const intervalHandler = setInterval(() => {
			setSecondsLeft(Math.floor((new Date(closeAt).getTime() - Date.now()) / 1000));
		}, 100);

		return () => {
			clearInterval(intervalHandler);
		};
	}, []);

	return <>{secondsLeft}</>;
}

export default function MissionDialog({ onRequestClose = () => {}, mission, user }) {
	const [groupMissionInfo, setGroupMissionInfo] = React.useState(null);
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
			if (action.mission.type === 'group' && action.mission.closeAt) {
				setGroupMissionInfo(action.mission);
			} else {
				dispatch(action);
				dispatch(ModalActions.closeModal());
				toast.success('Missão concluida com sucesso');
			}
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	}

	React.useEffect(() => {
		if (!groupMissionInfo) return;
		const { minimumOfUsersToComplete, closeAt } = groupMissionInfo;

		const toastId = toast.info(
			<>
				A missão será completada em <Timer closeAt={closeAt} /> segundos se{' '}
				{minimumOfUsersToComplete} outros usuário também tentarem completar-la
			</>,
			{ autoClose: false, closeOnClick: false },
		);
		const timeoutHandler = setTimeout(async () => {
			await submit();
		}, new Date(closeAt).getTime() - Date.now());
		return () => {
			toast.dismiss(toastId);
			clearTimeout(timeoutHandler);
		};
	}, [groupMissionInfo]);

	function close() {
		if (isLoading) return;
		dispatch(ModalActions.closeModal());
	}

	return (
		<>
			<Modal open className={style.root} onClose={close}>
				<div className={style.card}>
					<div className={style.modalTitle}>Concluir Missão</div>
					<div className={style.title}>{mission.title}</div>
					<div className={style.description}>{mission.description}</div>
					<div className={style.locationReference}>{mission.locationReference}</div>
					<div className={style.numberOfPacks}>
						Você vai ganhar {mission.numberOfPacks} pacotes{mission.isSpecial && ' especiais'}.
					</div>
					<div className={style.buttonContainer}>
						<Button variant="contained" color="secondary" fullWidth onClick={submit}>
							Concluir
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
