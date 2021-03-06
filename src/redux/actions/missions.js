import API from '../../api';
import { correctAllMissionCoords } from '../../lib/coords-corrector';

export async function fetchNearbyMissions(lat, lng) {
	const { data: missions } = await API.fetchNearbyMissions(lat, lng);

	correctAllMissionCoords(missions);

	return {
		type: 'SET_NEARBY_MISSIONS',
		nearbyMissions: missions,
	};
}

export async function completeLocationMission(missionArg, lat, lng) {
	const { data: mission } = await API.completeLocationMission(missionArg._id, lat, lng);
	return {
		type: 'COMPLETE_MISSION',
		mission,
	};
}

export function completeQRCodeMission(mission) {
	return {
		type: 'COMPLETE_MISSION',
		mission,
	};
}

export async function completeKeyMission(mission, key) {
	await API.completeKeyMission(mission._id, key);
	return {
		type: 'COMPLETE_MISSION',
		mission,
	};
}
