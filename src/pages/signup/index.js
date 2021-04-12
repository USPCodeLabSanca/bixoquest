import React from 'react';

import { Link } from 'react-router-dom';

import MultistepForm from '../../components/multistep-form';

import routes from '../../constants/routes';

import SignupOtherInfo from './steps/0-other-info';
import SignupCharacterSelect from './steps/1-character';

const style = {
	root: 'flex flex-col justify-center items-center text-center p-4 bg-primary min-h-full',
	card: 'bg-white shadow-lg rounded-lg w-full p-6 max-w-lg',
	linkContainer: 'flex flex-col items-start text-xs mt-2 text-white',
};

const SignupScreen = () => {
	return (
		<main className={style.root}>
			<div className={style.card}>
				<MultistepForm pages={[<SignupOtherInfo />, <SignupCharacterSelect />]} />
			</div>
			<div className={style.linkContainer}>
				<Link to={routes.login}>Já tem uma conta? Faça login!</Link>
			</div>
		</main>
	);
};

export default SignupScreen;
