import React from 'react';

// Material-ui imports
import Fab from '@material-ui/core/Fab';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import SwapVert from '@material-ui/icons/SwapVert';
import Receipt from '@material-ui/icons/Receipt';

// Library imports
import { useSelector, useDispatch } from 'react-redux';
import { Marker, Popup } from 'react-leaflet';
import { icon, point } from 'leaflet';
import { getDistance } from 'geolib';
import { useHistory } from 'react-router-dom';

// Redux actions imports
import * as MissionActions from '../../../redux/actions/missions';
import * as ModalActions from '../../../redux/actions/modal';

// Components imports
import Map from '../../../components/map';
import MissionDialog from '../../../components/modals/mission-dialog';
import PackModal from '../../../components/modals/packet';

// Images imports
import QuestionMark from '../../../images/question-mark.png';
import ExclamationMark from '../../../images/exclamation-mark.png';

// MISC imports
import MISSION_RANGE from '../../../constants/missions-range';
import Routes from '../../../constants/routes';

import PlayerOverlay from './players-overlay';

const missionIconOutOfRange = icon({
	iconUrl: QuestionMark,
	iconSize: point(40, 40),
});

const missionIconInRange = icon({
	iconUrl: ExclamationMark,
	iconSize: point(40, 40),
});

const style = {
	actionButtonsContainer: 'absolute bottom-0 right-0 mr-4 mb-16 flex flex-col',
	fab: {
		margin: '8px 0',
		outline: 'none',
	},
};

function geoToLatLng(geolocation) {
	if (!geolocation.isAvailable) return [null, null];
	const { latitude, longitude } = geolocation.position.coords;
	return [latitude, longitude];
}

export default function MapScreen() {
	const dispatch = useDispatch();
	const history = useHistory();
	const finishedMissions = useSelector(state => state.auth.user.completed_missions);
	const geolocation = useSelector(state => state.geolocation);
	const nearbyMissions = useSelector(state => state.missions.nearbyMissions);
	const availablePacks = useSelector(state => state.auth.user.available_packs);

	const showPack = ModalActions.useModal(() => <PackModal />);

	const userPosition = geoToLatLng(geolocation);

	// React.useEffect(() => {
	// 	if (!geolocation.isAvailable) return;
	// 	MissionActions.fetchNearbyMissions(...userPosition).then(dispatch);
	// }, [geolocation.isAvailable, ...userPosition]);

	function inRangeMissonMarker(mission) {
		return (
			<Marker
				zIndexOffset={10000}
				key={mission._id}
				icon={missionIconInRange}
				position={[mission.lat, mission.lng]}
				onClick={() => dispatch(ModalActions.setCurrentModal(<MissionDialog mission={mission} />))}
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

	function giveCards() {
		history.push(Routes.giveCards);
	}

	function readQrCode() {
		history.push(Routes.qrcodeReader);
	}

	function resolveMissionMarker(mission) {
		if (
			getDistance(
				{ latitude: mission.lat, longitude: mission.lng },
				{ latitude: userPosition[0], longitude: userPosition[1] },
			) < MISSION_RANGE
		)
			return inRangeMissonMarker(mission);
		return outOfRangeMissonMarker(mission);
	}

	function renderMissionMarkers() {
		if (!nearbyMissions) return null;
		const unfinishedMissions = nearbyMissions
			.filter(mission => mission.type === 'location')
			.filter(mission => !finishedMissions.some(finishedId => finishedId === mission._id));
		return unfinishedMissions.map(resolveMissionMarker);
	}

	return (
		<>
			<div className={style.actionButtonsContainer} style={{ zIndex: 10000 }}>
				<Fab size="small" style={style.fab} onClick={giveCards}>
					<SwapVert />
				</Fab>
				{availablePacks > 0 && (
					<Fab size="small" style={style.fab} onClick={showPack}>
						<Receipt />
					</Fab>
				)}
				<Fab size="small" style={style.fab} onClick={readQrCode}>
					<PhotoCamera />
				</Fab>
			</div>
			<Map initialConfiguration={{ center: userPosition, zoom: 18 }}>
				<PlayerOverlay />
				{renderMissionMarkers()}
			</Map>
		</>
	);
}
