import React from 'react';

import Close from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';
import MultistepForm from '../../components/multistep-form';

import SelectCardItems from './steps/0-select';
import ConfirmCardItems from './steps/1-confirmation';
import { updateUser as updateUserAction } from '../../redux/actions/auth';

import Routes from '../../constants/routes';
import { useDispatch } from 'react-redux';

const style = {
	root: 'w-full min-h-screen flex flex-col',
	header:
		'w-full h-12 flex justify-end text-white items-center uppercase font-bold mb-8 bg-gray-100 shadow-lg',
	headerButton: 'w-16 h-full justify-center items-center flex',
	main: 'h-full overflow-auto',
};

function GiveSpecialCards() {
	const history = useHistory();
	const dispatch = useDispatch();

	function leaveScreen() {
		history.replace(Routes.tabs.map);
	}

	React.useEffect(() => {
		(async () => {
			dispatch(await updateUserAction());
		})();
	}, []);

	return (
		<div className={style.root}>
			<header className={style.header}>
				<div className={style.headerButton} onClick={leaveScreen}>
					<Close fontSize="large" style={{ color: 'black' }} />
				</div>
			</header>
			<main className={style.main}>
				<MultistepForm
					markStepOnURLHash={false}
					pages={[<SelectCardItems />, <ConfirmCardItems />]}
				/>
			</main>
		</div>
	);
}

export default GiveSpecialCards;
