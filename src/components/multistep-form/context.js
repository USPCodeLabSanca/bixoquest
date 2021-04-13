import React from 'react';
import { getHashMarker, writeHashMarker } from '../../lib/hash';
import { useEffectUpdate } from '../../lib/hooks/use-effect-update';

/**
 * @typedef { Object } MultistepContext
 * @prop {number} stage
 * @prop {()=> void} nextStage
 * @prop {()=> void} prevStage
 * @prop {(stage: number)=> void} setStage
 * @prop {Object} formValue
 * @prop {() => void} clearFormValue
 * @prop {(formValueToAppend: Object)=> void} updateFormValue
 * @prop {()=> void} submit
 * @prop {boolean} hasSubmited
 */

/**
 * @type {React.Context<MultistepContext>}
 */
const context = React.createContext(null);

/**
 * @typedef { Object } MultistepProviderProps
 * @prop {boolean} markStepOnURLHash
 * @prop {number} maxStage
 */

/** @type {React.FunctionComponent<MultistepProviderProps>} */
const MultistepProvider = ({ maxStage, markStepOnURLHash, ...props }) => {
	const [formValue, setFormValue] = React.useState({});
	const [stage, rawSetStage] = React.useState(0);
	const [hasSubmited, setHasSubmited] = React.useState(false);

	React.useLayoutEffect(() => {
		if (!markStepOnURLHash) return;
		const oldFormStep = getHashMarker('form-step');

		if (!oldFormStep) {
			writeHashMarker('form-step', stage);
			return;
		} else {
			setStage(Number(oldFormStep));
		}
	}, []);

	useEffectUpdate(() => {
		if (!markStepOnURLHash) return;
		writeHashMarker('form-step', stage.toString());
	}, [stage]);

	const nextStage = React.useCallback(() => {
		rawSetStage(stage => Math.min(stage + 1, maxStage));
	}, []);

	const prevStage = React.useCallback(() => {
		rawSetStage(stage => Math.max(stage - 1, 0));
	}, []);

	const setStage = React.useCallback(
		newStage => {
			rawSetStage(Math.min(maxStage, Math.max(0, newStage)));
		},
		[maxStage],
	);

	const updateFormValue = React.useCallback(formValueToAppend => {
		setFormValue(formValue => ({ ...formValue, ...formValueToAppend }));
	}, []);

	const submit = React.useCallback(() => {
		setHasSubmited(true);
	}, []);

	const clearFormValue = React.useCallback(() => {
		setFormValue({});
	}, []);

	return (
		<context.Provider
			value={React.useMemo(
				() => ({
					stage,
					nextStage,
					prevStage,
					setStage,
					formValue,
					updateFormValue,
					hasSubmited,
					submit,
					clearFormValue,
				}),
				[stage, formValue, hasSubmited],
			)}
			{...props}
		/>
	);
};

const useMultistep = () => {
	return React.useContext(context);
};

export { useMultistep };
export default MultistepProvider;
