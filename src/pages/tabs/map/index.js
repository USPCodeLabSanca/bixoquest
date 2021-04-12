import React from 'react';

// Material-ui imports
import Fab from '@material-ui/core/Fab';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import SwapVert from '@material-ui/icons/SwapVert';
import Receipt from '@material-ui/icons/Receipt';

// Library imports
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Redux actions imports
import * as ModalActions from '../../../redux/actions/modal';

// Components imports
import Map from '../../../components/map';
import PackModal from '../../../components/modals/packet';

// Images imports

// MISC imports
import Routes from '../../../constants/routes';

import PlayerOverlay from './players-overlay';
import MissionMarkers from './mission-markers';

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
	const history = useHistory();
	const geolocation = useSelector(state => state.geolocation);
	const availablePacks = useSelector(state => state.auth.user.availablePacks);

	const showPack = ModalActions.useModal(() => <PackModal />);

	const userPosition = geoToLatLng(geolocation);

	function giveCards() {
		history.push(Routes.giveCards);
	}

	function readQrCode() {
		history.push(Routes.qrcodeReader);
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
				<MissionMarkers />
			</Map>
		</>
	);
}
