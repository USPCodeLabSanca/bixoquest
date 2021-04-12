import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import backendURL from '../../constants/api-url';
import { setCurrentModal } from '../../redux/actions/modal';
import * as AuthActions from '../../redux/actions/auth';
import FoundABugModal from '../../components/modals/found-a-bug';
import EditProfileModal from '../../components/modals/edit-profile';
import CharacterRenderer from '../../components/character-renderer';

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

	function edit() {
		dispatch(setCurrentModal(<EditProfileModal />));
	}

	return (
		<div className={style.root}>
			<Card className={style.card}>
				<div style={{ width: '100%', height: 300 }}>
					<CharacterRenderer charParts={user.character} />
				</div>
				<div className={style.userName}>{user.name}</div>
				<div className={style.userCourse}>{user.course}</div>
			</Card>
			<Button
				variant="contained"
				color="secondary"
				fullWidth
				style={style.generalButton}
				onClick={edit}
			>
				Editar perfil
			</Button>
			<Button variant="contained" fullWidth style={style.generalButton} onClick={foundABug}>
				Achou um bug?
			</Button>
			<Button variant="contained" fullWidth style={style.logoutButton} onClick={logout}>
				SAIR
			</Button>
		</div>
	);
}
