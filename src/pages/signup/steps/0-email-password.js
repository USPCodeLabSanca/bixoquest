import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import * as validators from '../../../lib/validators/fields';
import { toastifyErrors } from '../../../lib/validators';
import { useMultistep } from '../../../components/multistep-form/context';

const style = {
	root: 'flex flex-col justify-center items-center text-center px-4 pb-4 bg-primary h-full',
	header: 'text-4xl mb-4',
	subheader: 'text-md',
	form: 'flex flex-col gap-y-4',
};

function SignupEmailPassword() {
	const { nextStage, updateFormValue, formValue } = useMultistep();

	function getDataFromSubmitEvent(event) {
		const email = event.target.email.value.trim();
		const password = event.target.password.value.trim();
		return { email, password };
	}

	function validateData(newUser) {
		const problems = [];
		if (validators.email(newUser.email)) problems.push(validators.email(newUser.email));
		if (validators.password(newUser.password)) problems.push(validators.password(newUser.password));
		return problems;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const newUser = getDataFromSubmitEvent(event);
		const problems = validateData(newUser);
		if (problems.length > 0) return toastifyErrors(problems);

		updateFormValue(newUser);
		nextStage();
	}

	return (
		<div>
			<h1 className={style.header}>BixoQuest</h1>
			<p className={style.subheader}>Criar uma conta</p>
			<form onSubmit={handleSubmit} className={style.form}>
				<TextField
					defaultValue={formValue.email}
					label="Email (será usado para login)"
					name="email"
				/>
				<TextField
					defaultValue={formValue.password}
					label="Senha"
					type="password"
					name="password"
				/>
				<Button variant="contained" type="submit" color="secondary" fullWidth>
					Criar
				</Button>
				<Button variant="contained" type="submit" color="secondary" fullWidth>
					Criar com e-mail USP
				</Button>
			</form>
		</div>
	);
}

export default SignupEmailPassword;
