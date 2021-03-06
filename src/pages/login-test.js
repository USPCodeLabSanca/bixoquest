import React from 'react';

import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { login as loginAction } from '../redux/actions/auth';
import TextField from '@material-ui/core/TextField';
import { validateLogin, toastifyErrors } from '../lib/validators';

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

	async function handleSubmit(event) {
		event.preventDefault();

		const email = event.target.email.value.trim();
		const password = event.target.password.value.trim();

		const problems = validateLogin(email, password);
		if (problems.length > 0) return toastifyErrors(problems);

		setIsLoggingIn(true);
		try {
			dispatch(await loginAction(email, password));
		} finally {
			setIsLoggingIn(false);
		}
	}

	return (
		<main className={style.root}>
			<div className={style.card}>
				<h1 className={style.header}>BixoQuest</h1>
				<p className={style.subheader}>Entrar com email e senha</p>
				<form onSubmit={handleSubmit} className={style.form}>
					<TextField label="Usuário" name="email" />
					<TextField label="Senha" type="password" name="password" />
					<Button variant="contained" type="submit" color="secondary" fullWidth>
						Entrar{' '}
						{isLoggingIn && (
							<CircularProgress size={16} style={{ color: 'white', marginLeft: 8 }} />
						)}
					</Button>
				</form>
			</div>
		</main>
	);
};

export default LoginScreen;
