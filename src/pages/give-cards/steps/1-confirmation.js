import React from 'react';

import Button from '@material-ui/core/Button';

import { useMultistep } from '../../../components/multistep-form/context';
import StickersImages from '../../../constants/stickers';
import API from '../../../api';
import { CircularProgress } from '@material-ui/core';

const style = {
	root: 'h-full w-full flex flex-col',
	cardItemContainer: 'flex mx-4 my-2 h-content',
	image: 'w-16 h-24 bg-gray-500 flex justify-start items-end text-white text-xl',
	multiplier: 'flex flex-col justify-end items-center px-2',
	title: 'text-center text-xl w-full h-content mb-4 px-4',
	body: 'h-full flex flex-wrap content-start',
	footerButtonContainer: 'flex gap-x-4 w-full p-2 justify-end',
};

export default function Confirmation() {
	const [isFetchingToken, setIsFetchingToken] = React.useState(false);
	const { nextStage, prevStage, formValue, updateFormValue } = useMultistep();

	const { selectedCards } = formValue;

	async function handleSubmit() {
		const cards = [];
		Object.entries(selectedCards).forEach(([id, amount]) => {
			for (let i = 0; i < amount; i++) cards.push(+id);
		});
		setIsFetchingToken(true);
		try {
			const { data: token } = await API.fetchDonationToken({ stickers: cards });
			updateFormValue({ token });
			nextStage();
		} catch (e) {
			console.error(e);
		} finally {
			setIsFetchingToken(false);
		}
	}

	return (
		<div className={style.root}>
			<div className={style.title}>Confira se essas são as cartas que você quer doar</div>
			<div className={style.body}>
				{Object.entries(selectedCards).map(([stickerId, amount]) => (
					<div key={stickerId} className={style.cardItemContainer}>
						<div
							className={style.image}
							style={{
								backgroundImage: `url(${StickersImages.stickers[stickerId]})`,
								backgroundSize: 'cover',
							}}
						>
							{Number(stickerId) + 1}
						</div>
						<div className={style.multiplier}>x{amount}</div>
					</div>
				))}
			</div>
			<div className={style.footerButtonContainer}>
				<Button fullWidth onClick={prevStage} variant="contained">
					Voltar
				</Button>
				<Button
					fullWidth
					style={style.nextButton}
					onClick={handleSubmit}
					variant="contained"
					color="secondary"
				>
					Continuar{' '}
					{isFetchingToken && (
						<CircularProgress size={16} style={{ color: 'white', marginLeft: 8 }} />
					)}
				</Button>
			</div>
		</div>
	);
}
