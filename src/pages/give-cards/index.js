import React from 'react';

import Close from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';
import MultistepForm from '../../components/multistep-form';

import SelectCardItems from './steps/0-select';
import ConfirmCardItems from './steps/1-confirmation';
import CopyLink from './steps/2-link';

import Routes from '../../constants/routes';

const style = {
	root: 'w-full h-full flex flex-col',
	header:
		'w-full h-12 flex justify-end text-white items-center uppercase font-bold mb-8 bg-gray-100 shadow-lg',
	headerButton: 'w-16 h-full justify-center items-center flex',
	backArrowContainer:
		'z-10 w-16 h-16 rounded-full flex justify-center items-center absolute left-0',
	main: 'h-full overflow-auto',
	prevButton: { width: '100%', justifySelf: 'flex-start' },
	nextButton: { width: '100%', justifySelf: 'flex-end' },
};

function GiveCards() {
	const history = useHistory();

	function leaveScreen() {
		history.replace(Routes.tabs.map);
	}

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
					pages={[<SelectCardItems />, <ConfirmCardItems />, <CopyLink />]}
				/>
			</main>
		</div>
	);
}

export default GiveCards;
