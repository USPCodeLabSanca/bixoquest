import React from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import MultistepForm from '../../components/multistep-form';

import routes from '../../constants/routes';
import { signup as signupAction } from '../../redux/actions/auth';

import SignupEmailPassword from './steps/0-email-password';
import SignupOtherInfo from './steps/1-other-info';
import SignupCharacterSelect from './steps/2-character';

const style = {
	root: 'flex flex-col justify-center items-center text-center p-4 bg-primary min-h-full',
	header: 'text-4xl mb-4',
	subheader: 'text-md',
	card: 'bg-white shadow-lg rounded-lg w-full p-6 max-w-lg',
	form: 'flex flex-col gap-y-4',
	linkContainer: 'flex flex-col items-start text-xs mt-2 text-white',
};

const SignupScreen = () => {
	const dispatch = useDispatch();

	async function handleSubmit(data) {
		dispatch(await signupAction(data));
	}

	return (
		<main className={style.root}>
			<div className={style.card}>
				<MultistepForm
					onSubmit={handleSubmit}
					pages={[<SignupEmailPassword />, <SignupOtherInfo />, <SignupCharacterSelect />]}
				/>
			</div>
			<div className={style.linkContainer}>
				<Link to={routes.login}>Já tem uma conta? Faça login!</Link>
			</div>
		</main>
	);
};

export default SignupScreen;
