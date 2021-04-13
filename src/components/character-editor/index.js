import React from 'react';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import SlideableCharacterRenderer from '../slideable-character-renderer';
import {
	characterPartImageCount,
	characterPartNames,
	characterPartReadableName,
} from '../../constants/character-parts';
import Button from '@material-ui/core/Button';
import { useEffectUpdate } from '../../lib/hooks/use-effect-update';

const classes = {
	root: 'grid',
	arrows: 'flex flex-col justify-between pl-4',
	selectorRoot: `flex flex-col`,
	selectorTitle: `text-sm text-center px-2`,
	selectorArrowContainer: `flex`,
	selectorArrowNumber: `w-full text-center`,
};

export default function CharacterEditor({ onChange = () => {}, initialCharacter = {} }) {
	const [currentChar, setCurrentChar] = React.useState({
		skin: 0,
		cheek: 0,
		clothBottom: 0,
		clothTop: 0,
		eyes: 0,
		feet: 0,
		hair: 0,
		mouth: 0,
		...initialCharacter,
	});

	useEffectUpdate(() => {
		onChange(currentChar);
	}, [currentChar]);

	function updateCharacterPart(newParts) {
		setCurrentChar(state => ({ ...state, ...newParts }));
	}

	/**
	 * @argument { string } partName
	 */
	function makeSelector(partName) {
		function handleClickForward() {
			let newPart = currentChar[partName] + 1;
			const maximumPartNumber = characterPartImageCount[partName] - 1;
			if (newPart > maximumPartNumber) newPart = 0;
			updateCharacterPart({ [partName]: newPart });
		}
		function handleClickBackward() {
			let newPart = currentChar[partName] - 1;
			const maximumPartNumber = characterPartImageCount[partName] - 1;
			if (newPart < 0) newPart = maximumPartNumber;
			updateCharacterPart({ [partName]: newPart });
		}
		return (
			<div className={classes.selectorRoot}>
				<p className={classes.selectorTitle}>{characterPartReadableName[partName]}</p>
				<div className={classes.selectorArrowContainer}>
					<ChevronLeft style={{ cursor: 'pointer' }} onClick={handleClickBackward} />
					<p className={classes.selectorArrowNumber}>{currentChar[partName] + 1}</p>
					<ChevronRight style={{ cursor: 'pointer' }} onClick={handleClickForward} />
				</div>
			</div>
		);
	}

	function randomize() {
		const newCharacter = {};
		characterPartNames.forEach(partName => {
			newCharacter[partName] = Math.floor(Math.random() * characterPartImageCount[partName]);
		});
		setCurrentChar(newCharacter);
	}

	return (
		<div
			style={{ minHeight: 400, gridTemplateColumns: 'auto max-content' }}
			className={classes.root}
		>
			<div className="flex flex-col items-center">
        <div className="w-32 h-full">
				  <SlideableCharacterRenderer charParts={currentChar} />
        </div>
        <Button
          variant="contained"
          onClick={randomize}
          size="small"
          fullWidth
        >
          Aleatório
        </Button>
			</div>
			<div className={classes.arrows}>
				{makeSelector('skin')}
				{makeSelector('hair')}
				{makeSelector('eyes')}
				{makeSelector('cheek')}
				{makeSelector('mouth')}
				{makeSelector('clothTop')}
				{makeSelector('clothBottom')}
				{makeSelector('feet')}
			</div>
		</div>
	);
}
