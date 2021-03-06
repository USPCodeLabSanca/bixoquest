import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { useMultistep } from '../../../components/multistep-form/context';
import { toastifyErrors } from '../../../lib/validators';

const style = {
	root: 'flex flex-col justify-center items-center text-center px-4 pb-4 bg-primary h-full',
	header: 'text-4xl mb-4',
	subheader: 'text-md',
	form: 'flex flex-col gap-y-4',
};

function SignupOtherInfo() {
	const { nextStage, updateFormValue, formValue } = useMultistep();

	function getDataFromFormEvent(event) {
		const course = event.target.course.value.trim();
		const discord = event.target.discord.value.trim();
		return { course, discord };
	}

	function validateData(data) {
		const problems = [];
		if (!data.course) {
			problems.push('Você deve fornecer um curso');
		}
		return problems;
	}

	function handleFormSubmit(event) {
		event.preventDefault();

		const data = getDataFromFormEvent(event);
		const problems = validateData(data);
		if (problems.length > 0) return toastifyErrors(problems);

		updateFormValue(data);
		nextStage();
	}

	return (
		<div>
			<h1 className={style.header}>BixoQuest</h1>
			<p className={style.subheader}>Criar uma conta</p>
			<form onSubmit={handleFormSubmit} className={style.form}>
				<TextField
					defaultValue={formValue.discord}
					label="Sua tag no discord"
					type="string"
					name="discord"
				/>
				<TextField defaultValue={formValue.course} label="Curso" type="string" name="course" />
				<Button variant="contained" type="submit" color="secondary" fullWidth>
					Avançar
				</Button>
			</form>
		</div>
	);
}

export default SignupOtherInfo;
