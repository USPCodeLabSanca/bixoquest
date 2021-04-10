import React from 'react';
import { characterPartNames } from '../../constants/character-parts';

const classes = {
	charPart: 'absolute top-0 left-0 w-full h-full object-contain',
	root: 'relative w-full h-full',
};

export default function CharacterRenderer({ charParts }) {
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
		const partNumber = charParts[partName];
		return (
			<img
				className={classes.charPart}
				src={`/chars/${partName}/${partImageName(partNumber)}`}
				key={partName}
			/>
		);
	}

	return (
		<div className={classes.root}>{characterPartNames.map(name => makePartImageElement(name))}</div>
	);
}
