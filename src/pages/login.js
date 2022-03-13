import React from 'react';

import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

import {API_URL} from '../constants/api-url';
import { useHistory } from 'react-router-dom';
import routes from '../constants/routes';
import { silentAPI } from '../api';

const style = {
	root: 'flex flex-col justify-center items-center text-center px-4 pb-4 bg-primary h-full',
	header: 'text-4xl mb-4',
	subheader: 'text-md',
	card: 'bg-white shadow-lg rounded-lg w-full p-6 max-w-lg',
	form: 'flex flex-col gap-y-4',
	linksContainer: 'flex flex-col items-start text-xs gap-y-2',
};

const LoginScreen = () => {
	const [isLoggingIn, setIsLoggingIn] = React.useState(false);

	const dispatch = useDispatch();
	const history = useHistory();

	const loginWithUSP = async () => {
		window.location.href = API_URL + '/auth';
	};

	React.useEffect(() => {
		(async () => {
			try {
				setIsLoggingIn(true);
				const {
					data: { user, isSignup },
				} = await silentAPI.tryAuthenticateWithUSPCookie();

				if (isSignup) {
					history.push(routes.signup);
				} else {
					dispatch({
						type: 'SET_USER',
						user,
					});
				}
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoggingIn(false);
			}
		})();
	}, []);

	return (
		<main className={style.root}>
			<div className={style.card}>
				<h1 className={style.header}>BixoQuest</h1>
				<Button variant="outlined" onClick={loginWithUSP} type="button" color="secondary" fullWidth>
					Entrar com e-mail USP
				</Button>
			</div>
			<Backdrop style={{ zIndex: 50 }} open={isLoggingIn}>
				<CircularProgress size={50} style={{ color: 'white' }} />
			</Backdrop>
		</main>
	);
};

export default LoginScreen;
