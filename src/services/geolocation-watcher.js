import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as GeoActions from '../redux/actions/geolocation';

export default function GeolocationWatcher() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.auth.user);

	React.useEffect(() => {
		// Only watch position if the user is logged in
		if (!user) return;

		const id = navigator.geolocation.watchPosition(
			pos => dispatch(GeoActions.setPosition(pos)),
			error => {
				dispatch(GeoActions.unavailable(error));
				console.error(error);
			},
			{
				enableHighAccuracy: true,
			},
		);

		return () => navigator.geolocation.clearWatch(id);
	}, [Boolean(user)]);

	return null;
}
