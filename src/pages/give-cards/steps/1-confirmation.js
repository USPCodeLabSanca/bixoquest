import React from 'react';

import Button from '@material-ui/core/Button';

import { useMultistep } from '../../../components/multistep-form/context';
import StickersImages from '../../../constants/stickers';
import { CircularProgress } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import routes from '../../../constants/routes';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { donateStickers } from '../../../redux/actions/stickers';

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
	const dispatch = useDispatch();
	const { prevStage, formValue } = useMultistep();
	const history = useHistory();

	const { selectedCards } = formValue;
	const { id: targetId } = useParams();

	async function handleSubmit() {
		const cards = [];
		Object.entries(selectedCards).forEach(([id, amount]) => {
			for (let i = 0; i < amount; i++) cards.push(+id);
		});
		setIsFetchingToken(true);
		try {
			dispatch(await donateStickers(cards, targetId));
			toast.success('Cartas enviadas com sucesso!');
			history.push(routes.tabs.map);
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
