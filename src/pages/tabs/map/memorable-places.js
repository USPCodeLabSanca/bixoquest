import React from 'react';
import { ImageOverlay } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import MemorablePlacesModal from '../../../components/modals/memorable-places';
import { memorablePlaces } from '../../../constants/memorable-places';
import { setCurrentModal } from '../../../redux/actions/modal';

const IMAGE_SIZE = 30;
const IMAGE_SIZE_DIVIDER = 150000;

function calculateBounds(position) {
	return [
		[position[0] - IMAGE_SIZE / IMAGE_SIZE_DIVIDER, position[1] - IMAGE_SIZE / IMAGE_SIZE_DIVIDER],
		[position[0] + IMAGE_SIZE / IMAGE_SIZE_DIVIDER, position[1] + IMAGE_SIZE / IMAGE_SIZE_DIVIDER],
	];
}

function PlaceImage({ place }) {
	const imageRef = React.useRef();
	const dispatch = useDispatch();

	function handleOpenModal() {
		dispatch(setCurrentModal(<MemorablePlacesModal memorablePlace={place} />));
	}

	React.useEffect(() => {
		const imageElement = imageRef.current.getElement();
		const style = imageElement.style;

		style.pointerEvents = 'auto';

		imageElement.addEventListener('click', handleOpenModal);
		return () => {
			imageElement.removeEventListener('click', handleOpenModal);
		};
	}, []);

	return (
		<ImageOverlay
			bounds={calculateBounds([place.coords.lat, place.coords.lng])}
			zIndex={10000}
			ref={imageRef}
			url={'/icons/gallery-icon.png'}
		/>
	);
}

export default function MemorablePlaces() {
	return (
		<>
			{memorablePlaces.map(place => (
				<PlaceImage place={place} key={place.name} />
			))}
		</>
	);
}
