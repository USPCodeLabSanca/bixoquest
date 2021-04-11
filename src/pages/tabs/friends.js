import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import NotificationsIcon from '@material-ui/icons/Notifications';

import backendURL from '../../constants/api-url';
import * as AuthActions from '../../redux/actions/auth';

const style = {
	root: 'p-4 h-full',
	card: 'w-6/12 flex flex-col justify-center items-center p-4',
	friendCards: 'space-x-1 flex flex-row',
	avatar: { width: '15vw', height: '15vw', marginBottom: '8px' },
	userName: 'text-2xl text-center',
	userCourse: '',
	userYear: '',
	logoutButton: {
		margin: '16px 0',
		backgroundColor: '#718096',
		color: 'white',
		padding: '16px 0',
		fontSize: 16,
	},
	generalButton: {
		margin: '8px 0',
	},
	actionButtonsContainer: 'absolute bottom-0 right-0 mr-4 mb-16 flex flex-col',
	fab: {
		margin: '8px 0',
		outline: 'none',
	},
};

const classes = {
	title: 'text-xl pb-8',
};


export default function ProfilePage() {
	const user = useSelector(state => state.auth.user);
	const dispatch = useDispatch();
	let friendsList=[{user}, {user}, {user}];
	console.log(friendsList)

	function logout() {
		dispatch(AuthActions.logout());
		window.location.href = backendURL + 'auth/logout';
	}

	function findFriends() {
		console.log("procurar amiguinhos");
	}

	function notificationFriends() {
		console.log("ver novas solicitações de amizades");
	}

	return (
		<div className={style.root}>
			<h1 className={classes.title}>Meus amigos</h1>
			<div className={style.friendCards}>
				<Card className={style.card}>
					<Avatar style={style.avatar} />
					<div className={style.userName}>{user.name}</div>
					<div className={style.userCourse}>{user.course}</div>
				</Card>
			{/*		
				{friendsList.forEach((friend, i) => { 
					<Card className={style.card}>
						<Avatar style={style.avatar} />
						<div className={style.userName}>{friend.user.name}</div>
						<div className={style.userCourse}>{friend.user.course}</div>
					</Card>
					console.log("card ", i)
				 })}
				*/}
			</div>
			<Button variant="contained" fullWidth style={style.logoutButton} onClick={logout}>
				SAIR
			</Button>
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
