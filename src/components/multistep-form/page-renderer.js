import React from 'react';
import { useMultistep } from './context';

/**
 *
 * @typedef { Object } Props
 * @prop {React.ReactNode[]} pages
 * @prop {(newPage: number) => void} [onChangePage]
 * @prop {(formValue: Object) => void} [onSubmit]
 */

/**
 * @type { React.FunctionComponent<Props> }
 */
const PageRenderer = ({ pages, onSubmit = () => {}, onChangePage = () => {} }) => {
	const { stage, hasSubmited, formValue } = useMultistep();

	React.useEffect(() => {
		if (hasSubmited) onSubmit(formValue);
	}, [hasSubmited]);

	React.useEffect(() => {
		onChangePage(stage);
	}, [stage]);

	return pages[stage];
};

export default PageRenderer;
