import { useSelector } from 'react-redux';

export default function ModalRenderer() {
	return useSelector(state => state.modal.currentElement);
}
