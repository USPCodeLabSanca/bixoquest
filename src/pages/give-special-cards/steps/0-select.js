import React from 'react';
import { toast } from 'react-toastify';

import StickersImages from '../../../constants/stickers';

import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { useMultistep } from '../../../components/multistep-form/context';

const style = {
	root: 'h-full flex flex-col',
	cardItemContainer: 'flex items-center shadow',
	body: 'h-full',
	image: 'flex justify-start items-end bg-gray-500 text-white text-2xl',
	controlsContainer: 'flex h-full w-full items-center justify-between pl-2 pr-4',
	controlsInnerContainer: 'flex flex-col h-full justify-center items-center',
	amountSelectedText:
		'text-2xl border border-black rounded-lg h-16 w-16 flex items-center justify-center',
	multiplier: 'text-3xl h-full flex flex-col justify-end items-end',
	title: 'text-center text-xl mb-4 px-4',
	footerButtonContainer: 'flex w-full p-2 justify-end',
};

export default function SelectCardItems() {
	const [selectedCards, setSelectedCards] = React.useState({});
	const { nextStage, updateFormValue } = useMultistep();
	const userSpecialStickers = useSelector(state => state.auth.user.specialStickers);
	const uniquedCards = {};
	userSpecialStickers.forEach(card => {
		uniquedCards[card] = (uniquedCards[card] || 0) + 1;
	});
	const uniqueCardsEntriesArray = Object.entries(uniquedCards).filter(([id, amount]) => amount > 1);

	function selectCard(cardId) {
		const newCardValue = (selectedCards[cardId] || 0) + 1;
		if (newCardValue >= uniquedCards[cardId]) {
			toast.error('Você não pode doar todas as suas cartas especiais (deve sobrar pelo menos uma)');
			return;
		}
		setSelectedCards({ ...selectedCards, [cardId]: newCardValue });
	}

	function unselectCard(cardId) {
		const newCardValue = Math.max(0, (selectedCards[cardId] || 0) - 1);
		const newSelectedCards = { ...selectedCards, [cardId]: newCardValue };
		if (newCardValue === 0) delete newSelectedCards[cardId];
		setSelectedCards(newSelectedCards);
	}

	function handleSubmit() {
		if (Object.values(selectedCards).length === 0) {
			toast.error('Você deve selecionar pelo menos uma carta para doar');
			return;
		}
		updateFormValue({ selectedCards });
		nextStage();
	}

	return (
		<div className={style.root}>
			<div className={style.title}>
				{uniqueCardsEntriesArray.length === 0
					? 'Você não tem nenhuma carta especial repetida.\n Você só pode doar cartas especiais repetidas.'
					: 'Selecione as cartas que você quer doar'}
			</div>
			<div className={style.body}>
				{uniqueCardsEntriesArray.map(([stickerId, amount]) => (
					<div className={style.cardItemContainer} style={{ height: 151 }} key={stickerId}>
						<div
							className={style.image}
							style={{
								height: 151,
								width: 106.47,
								backgroundImage: `url(${StickersImages.specialStickers[stickerId]})`,
								backgroundSize: 'cover',
							}}
						>
							{+stickerId + 1}
						</div>
						<div className={style.controlsContainer}>
							<div className={style.multiplier}>
								{uniquedCards[stickerId] > 1 ? 'x' + uniquedCards[stickerId] : ''}
							</div>
							<div className={style.controlsInnerContainer} style={{ top: 22 }}>
								<KeyboardArrowUp fontSize="large" onClick={() => selectCard(stickerId)} />
								<div className={style.amountSelectedText}>{selectedCards[stickerId]}</div>
								<KeyboardArrowDown fontSize="large" onClick={() => unselectCard(stickerId)} />
							</div>
						</div>
					</div>
				))}
			</div>
			<div className={style.footerButtonContainer}>
				<Button
					style={style.nextButton}
					onClick={handleSubmit}
					variant="contained"
					color="secondary"
				>
					Continuar
				</Button>
			</div>
		</div>
	);
}
