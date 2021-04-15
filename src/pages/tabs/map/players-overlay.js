import { ImageOverlay, useMapEvent } from 'react-leaflet';
import React from 'react';
import { usePlayers } from '../playersContext';
import { useDispatch } from 'react-redux';
import { setCurrentModal } from '../../../redux/actions/modal';
import UserProfileModal from '../../../components/modals/user-profile';

const IMAGE_WIDTH = 14;
const IMAGE_HEIGHT = 9;
const PLAYER_SPEED = 0.000003;

const IMAGE_SIZE_DIVIDER = 70000;

function calculateBounds(position) {
	return [
		[
			position[0] - IMAGE_WIDTH / IMAGE_SIZE_DIVIDER,
			position[1] - IMAGE_HEIGHT / IMAGE_SIZE_DIVIDER,
		],
		[
			position[0] + IMAGE_WIDTH / IMAGE_SIZE_DIVIDER,
			position[1] + IMAGE_HEIGHT / IMAGE_SIZE_DIVIDER,
		],
	];
}

function PlayerImage({ player, userPlayer }) {
	const imageRef = React.useRef();
	const dispatch = useDispatch();

	function handlePlayerClick(event) {
		if (player === userPlayer) return;
		event.stopPropagation();
		console.log(userPlayer)
		dispatch(setCurrentModal(<UserProfileModal user={player.user} isFriend={userPlayer.user.friends.indexOf(player._id) !== -1} />));
	}

	React.useEffect(() => {
		const imageElement = imageRef.current.getElement();
		const style = imageElement.style;

		style.pointerEvents = 'auto';

		imageElement.addEventListener('click', handlePlayerClick);
		return () => {
			imageElement.removeEventListener('click', handlePlayerClick);
		};
	}, []);

	React.useEffect(() => {
		const { lat, lng } = imageRef.current.getBounds().getCenter();
		const [newLat, newLng] = player.position;
		const dlat = newLat - lat;
		const dlng = newLng - lng;
		const dist = Math.sqrt(dlat ** 2 + dlng ** 2);
		const frames = Math.floor(dist / PLAYER_SPEED);
		if (frames === 0) return;

		const frameDeltaVec = [(PLAYER_SPEED * dlat) / dist, (PLAYER_SPEED * dlng) / dist];

		let currFrame = 0;
		let currLat = lat;
		let currLng = lng;

		const intervalHandler = setInterval(() => {
			if (!imageRef.current) return;

			if (currFrame >= frames) {
				imageRef.current.setBounds(calculateBounds([dlat, dlng]));
				clearInterval(intervalHandler);
			}
			currFrame++;

			currLat += frameDeltaVec[0];
			currLng += frameDeltaVec[1];
			imageRef.current.setBounds(calculateBounds([currLat, currLng]));
		});

		return () => clearInterval(intervalHandler);
	}, [player.position[0], player.position[1]]);

	return (
		<ImageOverlay
			bounds={calculateBounds(player.position)}
			ref={imageRef}
			zIndex={10000}
			url={player.characterPNG}
		/>
	);
}

export default function PlayerOverlay() {
	const { players, movePlayer, userPlayer } = usePlayers();

	useMapEvent('click', event => {
		const { lat, lng } = event.latlng;
		movePlayer(lat, lng);
	});

	return (
		<>
			{players.map((player, index) => (
				<PlayerImage player={player} userPlayer={userPlayer} key={index} />
			))}
		</>
	);
}
