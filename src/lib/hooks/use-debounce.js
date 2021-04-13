import React from 'react';

export function useDebounce(func, time, options = {}) {
	const timeoutHandler = React.useRef(0);
	const lastExecution = React.useRef(options.startOnCooldown ? Date.now() : new Date(0).getTime());

	return (...args) => {
		const timeDiff = Date.now() - lastExecution.current;
		if (timeDiff >= time) {
			func(...args);
			lastExecution.current = Date.now();
		} else {
			clearTimeout(timeoutHandler.current);
			timeoutHandler.current = setTimeout(() => {
				func(...args);
				lastExecution.current = Date.now();
			}, time - timeDiff);
		}
	};
}
