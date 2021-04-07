import React from 'react';

export function useEffectAsync(effect, deps) {
	React.useEffect(() => {
		const ret = effect();
		if (!(ret instanceof Promise)) return ret;
	}, deps);
}
