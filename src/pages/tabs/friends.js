import React, { useEffect } from 'react';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import CharacterRenderer from '../../components/character-renderer';
import API from '../../api';
import routes from '../../constants/routes';
import { useHistory } from 'react-router';

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

export default function ProfilePage() {
	const [isLoading, setIsLoading] = React.useState(true);
	const [friendData, setFriendData] = React.useState([]);
	const history = useHistory();

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

	function handleDonate(id) {
		history.push(routes.giveCards.replace(':id', id));
	}

	function handleDonateSpecial(id) {
		history.push(routes.giveSpecialCards.replace(':id', id));
	}

	return (
		<div className={style.root}>
			<h1 className={style.title}>Meus amigos</h1>

			{!isLoading && (
				<div className={style.cardsList}>
					{Object.entries(friendData).map(([i, friend]) => (
						<Card className={style.card} key={i}>
							<div style={{ width: '100%', height: 150 }}>
								<CharacterRenderer charParts={friend.character} />
							</div>
							<Button
								color="primary"
								variant="contained"
								fullWidth
								style={{ marginTop: 8, marginBottom: 8, fontSize: 10 }}
								onClick={() => handleDonate(friend._id)}
							>
								Doar cartas
							</Button>
							<Button
								color="primary"
								variant="contained"
								fullWidth
								style={{ marginTop: 8, marginBottom: 8, fontSize: 10 }}
								onClick={() => handleDonateSpecial(friend._id)}
							>
								Doar cartas especiais
							</Button>
							<div className={style.userName}>{friend.name}</div>
							<div className={style.userCourse}>{friend.course}</div>
						</Card>
					))}
				</div>
			)}

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
