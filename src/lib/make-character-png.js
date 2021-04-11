import { characterPartNames } from '../constants/character-parts';

export async function makeCharacterPNG(character) {
	const canvas = document.createElement('canvas');
	canvas.width = 900;
	canvas.height = 1400;
	const ctx = canvas.getContext('2d');

	function makeImageName(partName) {
		const imageName = character[partName].toString().padStart(2, '0');
		return `/chars/${partName}/${imageName}.png`;
	}

	const imageSrc = characterPartNames.map(makeImageName);
	const imageElements = imageSrc.map(src => {
		const element = new Image();
		element.src = src;
		return element;
	});

	await Promise.all(
		imageElements.map(async element => {
			return new Promise(resolve => {
				element.addEventListener('load', resolve);
			});
		}),
	);

	imageElements.forEach(element => {
		ctx.drawImage(element, 0, 0);
	});

	return canvas.toDataURL('png');
}
