import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

import backendURL from '../../constants/api-url';
import { setCurrentModal } from '../../redux/actions/modal';
import * as AuthActions from '../../redux/actions/auth';
import FoundABugModal from '../../components/modals/found-a-bug';

const style = {
	root: 'p-4 h-full',
	card: 'w-full flex flex-col justify-center items-center p-4',
	avatar: { width: '30vw', height: '30vw', marginBottom: '8px' },
	userName: 'text-2xl text-center',
	userCourse: '',
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

export default function ProfilePage() {
	const user = useSelector(state => state.auth.user);
	const dispatch = useDispatch();

	function logout() {
		dispatch(AuthActions.logout());
		window.location.href = backendURL + 'auth/logout';
	}

	function foundABug() {
		dispatch(setCurrentModal(<FoundABugModal />));
	}

	function findFriends() {
		console.log("procurar amiguinhos");
	}

	return (
		<div className={style.root}>
			<Card className={style.card}>
				<Avatar style={style.avatar} />
				<div className={style.userName}>{user.name}</div>
				<div className={style.userCourse}>{user.course}</div>
			</Card>
			<Button variant="contained" fullWidth style={style.generalButton} onClick={foundABug}>
				Achou um bug?
			</Button>
			<Button variant="contained" fullWidth style={style.logoutButton} onClick={logout}>
				SAIR
			</Button>
			<div className={style.actionButtonsContainer} style={{ zIndex: 10000 }}>
				<Fab size="small" style={style.fab} onClick={findFriends}>
						<GroupAddIcon />
				</Fab>
			</div>
		</div>
	);
}
