import React from 'react';
import CharacterRenderer from '../../../../components/character-renderer';

const style = {
	root: 'flex w-full',
	myMessageRoot: 'justify-end',
	otherMessageRoot: '',
	characterContainer: 'self-end',
	messageCard: 'mb-8 p-2 rounded-xl my-1',
	myMessageCard: 'bg-white rounded-br-none',
	otherMessageCard: 'rounded-bl-none',
	senderName: 'text-sm mb-2',
	text: 'break-words',
	date: 'text-sm mt-2',
};

function readableDate(date) {
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	return `${hours}h ${minutes}m`;
}

export default function Message({ message }) {
	const { sender, text, date, isCurrentUser } = message;

	const characterElement = (
		<div className={style.characterContainer} style={{ height: 60, width: 40 }}>
			<CharacterRenderer charParts={sender.character} />
		</div>
	);

	return (
		<div
			className={`${style.root} ${isCurrentUser ? style.myMessageRoot : style.otherMessageRoot}`}
		>
			{!isCurrentUser && characterElement}
			<div
				style={{
					maxWidth: '70%',
					width: 'max-content',
					backgroundColor: isCurrentUser ? '' : 'rgb(3, 169, 243)',
					color: isCurrentUser ? '' : 'white',
				}}
				className={`${style.messageCard} ${
					isCurrentUser ? style.myMessageCard : style.otherMessageCard
				}`}
			>
				<p className={style.senderName}>{sender.name}</p>
				<p className={style.text}>{text}</p>
				<p className={style.date}>{readableDate(date)}</p>
			</div>
			{isCurrentUser && characterElement}
		</div>
	);
}
