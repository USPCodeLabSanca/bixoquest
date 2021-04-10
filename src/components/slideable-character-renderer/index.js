import React from 'react';
import { characterPartImageCount, characterPartNames } from '../../constants/character-parts';

const classes = {
	charPart: 'absolute top-0 left-0 w-full h-full object-contain',
	root: 'relative w-full h-full',
};

export default function SlideableCharacterRenderer({ charParts }) {
	/**
	 * @argument { number } part
	 */
	function partImageName(part) {
		return `${part.toString().padStart(2, '0')}.png`;
	}

	/**
	 * @argument { string } partName
	 */
	function makePartImageElement(partName) {
		const partImageCount = characterPartImageCount[partName];
		const partImageNames = [];
		for (let i = 0; i < partImageCount; i++) {
			partImageNames.push(partImageName(i));
		}

		const selectedPartNumber = charParts[partName];

		return (
			<div
				key={partName}
				style={{
					overflow: 'hidden',
					width: '100%',
					height: '100%',
					position: 'absolute',
					top: 0,
					left: 0,
					display: 'flex',
				}}
			>
				{partImageNames.map((imageName, index) => (
					<img
						style={{
							transition: '200ms',
							transform: `translate(${(index - selectedPartNumber) * 100}%, 0)`,
						}}
						className={classes.charPart}
						src={`/chars/${partName}/${imageName}`}
						key={imageName}
					/>
				))}
			</div>
		);
	}

	return (
		<div className={classes.root}>{characterPartNames.map(name => makePartImageElement(name))}</div>
	);
}
