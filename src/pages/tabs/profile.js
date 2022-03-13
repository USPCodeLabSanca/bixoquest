import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import {API_URL} from '../../constants/api-url';
import { setCurrentModal } from '../../redux/actions/modal';
import * as AuthActions from '../../redux/actions/auth';
import FoundABugModal from '../../components/modals/found-a-bug';
import EditProfileModal from '../../components/modals/edit-profile';
import CharacterRenderer from '../../components/character-renderer';

const style = {
	root: 'container mx-auto max-w-lg p-4 h-full',
	card: 'w-full flex flex-col justify-center items-center p-4',
	avatar: { width: '30vw', height: '30vw', marginBottom: '8px' },
	userName: 'text-xl text-center',
	userCourse: 'text-sm',
	logoutButton: {
		backgroundColor: '#718096',
		color: 'white',
		fontSize: 16,
	},
};

export default function ProfilePage() {
	const user = useSelector(state => state.auth.user);
	const dispatch = useDispatch();

	function logout() {
		dispatch(AuthActions.logout());
		window.localStorage.removeItem('persist:root');
		setTimeout(() => (window.location.href = API_URL + '/auth/logout'), 500);
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
				<div style={{ width: '100%', height: 150 }}>
					<CharacterRenderer charParts={user.character} />
				</div>
				<div className={style.userName}>{user.name}</div>
				<div className={style.userCourse}>{user.course}</div>
			</Card>
			<div className="pt-4">
				<Button
					variant="contained"
					color="secondary"
					fullWidth
					style={style.generalButton}
					onClick={edit}
					size="small"
				>
					Editar perfil
				</Button>
			</div>
			<div className="pt-4">
				<Button
					variant="contained"
					fullWidth
					style={style.generalButton}
					onClick={foundABug}
					size="small"
				>
					Achou um bug?
				</Button>
			</div>
			<div className="pt-4">
				<Button variant="contained" fullWidth style={style.logoutButton} onClick={logout}>
					SAIR
				</Button>
			</div>
		</div>
	);
}
