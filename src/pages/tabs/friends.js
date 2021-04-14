import React, { useEffect} from 'react';

import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CharacterRenderer from '../../components/character-renderer';

import API from '../../api';


const style = {
	root: 'p-4 h-full',
	card: 'flex flex-col justify-center items-center p-2',
	friendCards: 'w-auto grid grid-cols-3 gap-1 ',
	avatar: { width: '15vw', height: '15vw' },
	userName: 'text-md text-center font-bold',
	userCourse: 'text-xs',
	actionButtonsContainer: 'absolute bottom-0 right-0 mr-4 mb-16 flex flex-col',
	fab: {
		margin: '8px 0',
		outline: 'none',
	},
};

const classes = {
	title: 'text-xl pb-8',
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
		</Card>
		)
	}
  
	return (
	  <div className={style.friendCards}>
		{list}
	  </div>
	)
  }

export default function ProfilePage() {
	const [isLoading, setIsLoading] = React.useState(true);
	const [friendData, setFriendData] = React.useState([]);

	useEffect(() => {
        (async () => {
            try {
				setFriendData((await API.getFriends()).data)
				setIsLoading(false);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

	//let friendsList=[{user}, {user}, {user}, {user}];

	function findFriends() {
		console.log("procurar amiguinhos");
	}

	function notificationFriends() {
		console.log("ver novas solicitações de amizades");
	}

	return (
		<div className={style.root}>
			<h1 className={classes.title}>Meus amigos</h1>
			
			{!isLoading && renderCards(friendData)}
					
			<div className={style.actionButtonsContainer} style={{ zIndex: 10000 }}>
				<Fab size="small" style={style.fab} onClick={findFriends}>
					<GroupAddIcon />
				</Fab>
				<Fab size="small" style={style.fab} onClick={notificationFriends}>
					<NotificationsIcon />
				</Fab>
			</div>
		</div>
	);
}
