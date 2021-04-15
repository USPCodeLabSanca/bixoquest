import React, { useEffect } from 'react';

import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import NotificationsIcon from '@material-ui/icons/Notifications';

import CharacterRenderer from '../../components/character-renderer';
import API from '../../api';

const style = {
	root: 'p-4 h-full',
	title: 'text-xl p-3 uppercase',

	cardsList: 'w-auto grid grid-cols-3 gap-1 p-1',
	card: 'flex flex-col justify-center items-center p-2 pt-0',
	avatar: { width: '15vw', height: '15vw' },
	userName: 'text-sm text-center font-bold truncate mx-auto max-w-full ',
	userCourse: 'text-xs',

	actionButtonsContainer: 'absolute bottom-0 right-0 mr-4 mb-16 flex flex-col',
	fab: {
		margin: '8px 0',
		outline: 'none',
	},
};

function renderCards(friendsList) {
	const list = [];

	for (const [i, friend] of friendsList.entries()) {
		list.push(
			<Card className={style.card} key={i}>
				<div style={{ width: '100%', height: 150 }}>
					<CharacterRenderer charParts={friend.character} />
				</div>
				<div className={style.userName}>{friend.name}</div>
				<div className={style.userCourse}>{friend.course}</div>
			</Card>,
		);
	}

	return <div className={style.cardsList}>{list}</div>;
}

export default function ProfilePage() {
	const [isLoading, setIsLoading] = React.useState(true);
	const [friendData, setFriendData] = React.useState([]);

	useEffect(() => {
		(async () => {
			try {
				setFriendData((await API.getFriends()).data);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	function findFriends() {
		console.log('procurar amiguinhos');
	}

	function notificationFriends() {
		console.log('ver novas solicitações de amizades');
	}

	return (
		<div className={style.root}>
			<h1 className={style.title}>Meus amigos</h1>

			{!isLoading && renderCards(friendData)}

			<div className={style.actionButtonsContainer} style={{ zIndex: 10000 }}>
				{/*
				<Fab size="small" style={style.fab} onClick={findFriends}>
					<GroupAddIcon />
				</Fab>
				<Fab size="small" style={style.fab} onClick={notificationFriends}>
					<NotificationsIcon />
				</Fab>
				*/}
			</div>
		</div>
	);
}
