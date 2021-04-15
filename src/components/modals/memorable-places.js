import React from 'react';

import Carousel from 'react-material-ui-carousel';

import Modal from '../modal';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/actions/modal';
import Button from '@material-ui/core/Button';

const style = {
	root: 'flex justify-center items-center',
	backdrop: 'fixed top-0 left-0 w-full h-full flex justify-center items-center',
	card: 'bg-white shadow-md container mx-auto max-w-lg lg:rounded',
	imageContainer: '',
	name: 'text-xl text-center p-4',
	image: 'absolute inset-0 h-full-important shadow-md w-full',
	description: 'text-xs p-4',
	buttonContainer: 'w-full px-4 pb-4',
};

export default function MemorablePlacesModal({ memorablePlace }) {
	const dispatch = useDispatch();
	const renderDate = React.useRef(Date.now());

	function handleClose() {
		dispatch(closeModal());
	}

	function handleBackdropClick(event) {
		if (Date.now() - renderDate.current < 100) event.stopPropagation();
		else dispatch(closeModal());
	}

	return (
		<Modal open className={style.root} onClose={handleClose}>
			<div
				className={style.backdrop}
				onClick={handleBackdropClick}
				style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
			>
				<div className={style.card} onClick={e => e.stopPropagation()}>
					<div className={style.name}>{memorablePlace.name}</div>
					<Carousel
						animation="slide"
						navButtonsAlwaysVisible="true"
						indicators={false}
						interval={6000}
					>
						{memorablePlace.images.map(({ url, description }) => (
							<div key={url} className={style.imageContainer}>
								<div className="container-16-9 inset-0">
									<img src={url} className={style.image} alt={memorablePlace.name} />
								</div>
								<p className={style.description}>{description}</p>
							</div>
						))}
					</Carousel>
					<div className={style.buttonContainer}>
						<Button variant="contained" color="secondary" fullWidth onClick={handleClose}>
							Ok
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	);
}
