import React from 'react';

import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import backendURL from '../constants/api-url';
import { tryAuthenticateWithUSPCookie, signup as signupAction } from '../redux/actions/auth';
import * as ModalActions from '../redux/actions/modal';
import * as validators from '../lib/validators/fields';
import Modal from '../components/modal';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import { validateLogin, toastifyErrors } from '../lib/validators';

const style = {
	root: 'flex flex-col justify-center text-center px-4 pb-4 bg-primary h-full',
	header: 'text-4xl mb-4',
	subheader: 'text-md',
	card: 'bg-white shadow-lg rounded-lg w-full p-6',
	form: 'flex flex-col gap-y-4',
	linksContainer: 'flex flex-col items-start text-xs gap-y-2',
};

const SignupScreen = () => {
	const [isSigningUp, setIsSigningUp] = React.useState(false);
	const dispatch = useDispatch();

	function getDataFromSubmitEvent(event) {
		const name = event.target.name.value.trim();
		const course = event.target.course.value.trim();
		const email = event.target.email.value.trim();
		const password = event.target.password.value.trim();
		return { email, password, name, course };
	}

	function validateData(newUser) {
		const problems = [];
		if (!newUser.name) problems.push('Você deve fornecer um nome');
		if (!newUser.course) problems.push('Você deve fornecer um curso');
		if (validators.email(newUser.email)) problems.push(validators.email(newUser.email));
		if (validators.password(newUser.password)) problems.push(validators.password(newUser.password));
		return problems;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const newUser = getDataFromSubmitEvent(event);
		const problems = validateData(newUser);
		if (problems.length > 0) return toastifyErrors(problems);

		setIsSigningUp(true);
		try {
			dispatch(await signupAction(newUser));
		} finally {
			setIsSigningUp(false);
		}
	}

	return (
		<main className={style.root}>
			<div className={style.card}>
				<h1 className={style.header}>BixoQuest</h1>
				<p className={style.subheader}>Criar uma conta</p>
				<form onSubmit={handleSubmit} className={style.form}>
					<TextField label="Nome" name="name" />
					<TextField label="Curso" name="course" />
					<TextField label="Email (será usado para login)" name="email" />
					<TextField label="Senha" type="password" name="password" />
					<Button variant="contained" type="submit" color="secondary" fullWidth>
						Criar
					</Button>
					<div className={style.linksContainer}>
						<Link to={routes.login}>Já tem uma conta? Faça login!</Link>
					</div>
				</form>
			</div>
		</main>
	);
};

export default SignupScreen;
