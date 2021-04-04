import React from 'react';

import Modal from '@material-ui/core/Modal';
import { useDispatch } from 'react-redux';

import * as ModalActions from '../redux/actions/modal';

function CustomModal({ onClose, ...props }) {
	const dispatch = useDispatch();
	function close() {
		dispatch(ModalActions.closeModal());
	}
	return <Modal open onClose={onClose || close} {...props} />;
}

export default CustomModal;

export { ModalActions };
