import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { icon, point } from 'leaflet';
import { getDistance } from 'geolib';

import * as ModalActions from '../../../redux/actions/modal';
import * as MissionActions from '../../../redux/actions/missions';

import MissionDialog from '../../../components/modals/mission-dialog';
import MISSION_RANGE from '../../../constants/missions-range';
import { useDispatch, useSelector } from 'react-redux';
import { usePlayers } from '../playersContext';
import { useDebounce } from '../../../lib/hooks/use-debounce';

const missionIconOutOfRange = icon({
	iconUrl: '/question-mark.png',
	iconSize: point(40, 40),
});

const missionIconInRange = icon({
	iconUrl: '/exclamation-mark.png',
	iconSize: point(40, 40),
});

export default function MissionMarkers() {
	const { userPlayer } = usePlayers();

	const dispatch = useDispatch();
	const finishedMissions = useSelector(state => state.auth.user.completedMissions);
	const nearbyMissions = useSelector(state => state.missions.nearbyMissions);

	const fetchMissions = useDebounce(async () => {
		dispatch(await MissionActions.fetchNearbyMissions(...userPlayer.position));
	}, 1000);

	React.useEffect(() => {
		if (!userPlayer) return;
		console.log(userPlayer);
		fetchMissions();
	}, [userPlayer && userPlayer.position[0], userPlayer && userPlayer.position[1]]);

	function inRangeMissonMarker(mission) {
		return (
			<Marker
				zIndexOffset={10000}
				key={mission._id}
				icon={missionIconInRange}
				position={[mission.lat, mission.lng]}
				eventHandlers={{
					click: () =>
						dispatch(
							ModalActions.setCurrentModal(<MissionDialog mission={mission} user={userPlayer} />),
						),
				}}
			/>
		);
	}
	function outOfRangeMissonMarker(mission) {
		return (
			<Marker
				zIndexOffset={10000}
				key={mission._id}
				icon={missionIconOutOfRange}
				position={[mission.lat, mission.lng]}
			>
				<Popup>Venha até aqui para completar essa missão.</Popup>
			</Marker>
		);
	}
	function resolveMissionMarker(mission) {
		if (
			getDistance(
				{ latitude: mission.lat, longitude: mission.lng },
				{ latitude: userPlayer.position[0], longitude: userPlayer.position[1] },
			) < MISSION_RANGE
		)
			return inRangeMissonMarker(mission);
		return outOfRangeMissonMarker(mission);
	}
	if (!nearbyMissions || !userPlayer) return null;

	const unfinishedMissions = nearbyMissions
		.filter(mission => mission.type === 'location')
		.filter(mission => !finishedMissions.some(finishedId => finishedId === mission._id));

	return <>{unfinishedMissions.map(resolveMissionMarker)}</>;
}
