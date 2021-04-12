import React from 'react';

import Modal from '../modal';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/actions/modal';
import Button from '@material-ui/core/Button';

const style = {
	root: 'flex justify-center items-center p-4',
	card: 'p-4 bg-white flex flex-col rounded-lg max-h-full overflow-auto max-w-md w-full',
	name: 'text-2xl text-center mb-4',
	image: 'mb-2',
	imageContainer: 'mb-8',
};

export default function MemorablePlacesModal({ memorablePlace }) {
	const dispatch = useDispatch();

	function handleClose() {
		dispatch(closeModal());
	}

	return (
		<Modal open className={style.root} onClose={handleClose}>
			<div className={style.card}>
				<div className={style.name}>{memorablePlace.name}</div>
				{memorablePlace.images.map(({ url, description }) => (
					<div key={url} className={style.imageContainer}>
						<img src={url} className={style.image} />
						<p>{description}</p>
					</div>
				))}
				<Button variant="contained" color="secondary" onClick={handleClose}>
					Ok
				</Button>
			</div>
		</Modal>
	);
}
