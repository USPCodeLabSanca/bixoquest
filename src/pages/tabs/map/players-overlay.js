import { ImageOverlay, useMap } from 'react-leaflet';
import React from 'react';
import { usePlayers } from '../playersContext';

const IMAGE_WIDTH = 14;
const IMAGE_HEIGHT = 9;

export default function PlayerOverlay() {
	const map = useMap();
	const { players, movePlayer } = usePlayers();

	React.useEffect(() => {
		function handleClick(event) {
			const { lat, lng } = event.latlng;
			movePlayer(lat, lng);
		}

		map.on('click', handleClick);
		return () => {
			map.off('click', handleClick);
		};
	}, [movePlayer]);

	return (
		<>
			{players.map(({ position, characterPNG }) => (
				<ImageOverlay
					key={Math.random()}
					bounds={[
						[position[0] - IMAGE_WIDTH / 30000, position[1] - IMAGE_HEIGHT / 30000],
						[position[0] + IMAGE_WIDTH / 30000, position[1] + IMAGE_HEIGHT / 30000],
					]}
					url={characterPNG}
				/>
			))}
		</>
	);
}
