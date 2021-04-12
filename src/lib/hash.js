export function getAllMarkers() {
	const hash = window.location.hash.substr(1);
	return hash.split('|').filter(e => e);
}

export function getHashMarker(markerName) {
	const allMarkers = getAllMarkers();
	const marker = allMarkers.find(marker => marker.startsWith(markerName));
	if (!marker) return null;
	return marker.split('=')[1];
}

export function writeHashMarker(markerName, markerValue) {
	const allMarkers = getAllMarkers();
	const markerIndex = allMarkers.findIndex(marker => marker.startsWith(markerName));
	if (markerIndex === -1) {
		allMarkers.push(`${markerName}=${markerValue}`);
	} else {
		allMarkers.splice(markerIndex, 1, `${markerName}=${markerValue}`);
	}
	window.location.hash = `#${allMarkers.join('|')}`;
}
