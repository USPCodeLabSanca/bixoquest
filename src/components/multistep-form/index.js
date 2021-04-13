import React from 'react';
import MultistepProvider from './context';
import PageRenderer from './page-renderer';

/**
 * @typedef { Object } Props
 * @prop {React.ReactNode[]} pages
 * @prop {(newPage: number) => void} [onChangePage]
 * @prop {(formValue: Object) => void} [onSubmit]
 * @prop {boolean} [markStepOnURLHash]
 */

/**
 * @type { React.FunctionComponent<Props> }
 */
const MultistepForm = ({ pages, markStepOnURLHash = true, onSubmit, onChangePage }) => {
	return (
		<MultistepProvider markStepOnURLHash={markStepOnURLHash} maxStage={pages.length - 1}>
			<PageRenderer onSubmit={onSubmit} pages={pages} onChangePage={onChangePage} />
		</MultistepProvider>
	);
};

export default MultistepForm;
