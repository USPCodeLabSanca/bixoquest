import { ImageOverlay, useMapEvent } from 'react-leaflet';
import React from 'react';
import { usePlayers } from '../playersContext';

const IMAGE_WIDTH = 14;
const IMAGE_HEIGHT = 9;

export default function PlayerOverlay() {
	const { players, movePlayer } = usePlayers();
	useMapEvent('click', event => {
		const { lat, lng } = event.latlng;
		movePlayer(lat, lng);
	});

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
