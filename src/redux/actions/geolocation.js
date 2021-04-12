export function setPosition(position) {
	return {
		type: 'SET_POSITION',
		position,
	};
}

export function unavailable(error) {
	const defaultMessage = 'Ops! um erro desconhecido ocorreu. Por favor, tente novamente.';
	const errorMessages = {
		// More details about the errors [here](https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError)
		// User denied permission
		1: 'Parece que este site não tem acesso à sua localização. Por favor, verifique se as permissões estão corretas.',
		// Position unavailable
		2: 'Tivemos um problema ao buscar sua localização. Por favor, recarregue a página e tente novamente.',
		// timeout
		3: 'Tivemos um problema ao buscar sua localização. Por favor, recarregue a página e tente novamente.',
	};
	return {
		type: 'UNAVAILABLE',
		error: {
			code: error.code,
			message: errorMessages[error.code] || defaultMessage,
		},
	};
}
