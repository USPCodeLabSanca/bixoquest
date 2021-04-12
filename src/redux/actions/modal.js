import { useDispatch } from 'react-redux';

export function setCurrentModal(modalElement) {
	return {
		type: 'SET_CURRENT_MODAL',
		element: modalElement,
	};
}

export function closeModal() {
	return {
		type: 'CLOSE_MODAL',
	};
}

export function useModal(modalElementCreator) {
	const dispatch = useDispatch();
	return () => {
		dispatch(setCurrentModal(modalElementCreator()));
	};
}
