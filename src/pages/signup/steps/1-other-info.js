import React from 'react';
import { useMultistep } from '../../../components/multistep-form/context';

function SignupOtherInfo() {
	const { nextStage, updateFormValue } = useMultistep();

	/**
	 * Função chamada quando o usuário tentar ir para o próximo passo. Ela deve ser responsável
	 * por extrair e validar os dados do usuário.
	 */
	function handleFormSubmit() {
		// TODO - Ler esses dados do usuário
		const data = { name: 'Nome da pessoa', course: 'Curso da pessoad', discordHandle: '@myHandle' };

		updateFormValue(data);
		nextStage();
	}

	// Remove this line when you implement this part of the form
	React.useEffect(handleFormSubmit, []);

	// TODO - criar esse formulário
	return <div></div>;
}

export default SignupOtherInfo;
