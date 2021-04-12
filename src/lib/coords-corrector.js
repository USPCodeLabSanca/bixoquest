/*
Aparently, google maps and OpenStreetMap have a slight difference in their coordenates.
This is to adjust for that
*/

export function correctCoords(coords) {
	if (coords instanceof Array) {
		const [lat, lng] = coords;
		return [lat, lng];
	} else {
		const { lat, lng } = coords;
		return {
			lat: lat,
			lng: lng,
		};
	}
}

export function correctMissionCoords(mission) {
	const newCoords = correctCoords(mission);
	mission.lat = newCoords.lat;
	mission.lng = newCoords.lng;
}

export function correctAllMissionCoords(missions) {
	missions.forEach(mission => {
		correctMissionCoords(mission);
	});
}
