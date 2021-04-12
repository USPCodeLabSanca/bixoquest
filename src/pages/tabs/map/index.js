import React from 'react';

// Material-ui imports
// import Fab from '@material-ui/core/Fab';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';
// import SwapVert from '@material-ui/icons/SwapVert';
// import Receipt from '@material-ui/icons/Receipt';

// Library imports
// import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';

// Redux actions imports
// import * as ModalActions from '../../../redux/actions/modal';

// Components imports
import Map from '../../../components/map';
// import PackModal from '../../../components/modals/packet';

// Images imports

// MISC imports
// import Routes from '../../../constants/routes';

import PlayerOverlay from './players-overlay';
import MissionMarkers from './mission-markers';
import { initialPlayerPosition } from '../../../constants/initial-player-position';
import MemorablePlaces from './memorable-places';

const style = {
	actionButtonsContainer: 'absolute bottom-0 right-0 mr-4 mb-16 flex flex-col',
	fab: {
		margin: '8px 0',
		outline: 'none',
	},
};

export default function MapScreen() {
	// const history = useHistory();
	// const availablePacks = useSelector(state => state.auth.user.availablePacks);

	// const showPack = ModalActions.useModal(() => <PackModal />);

	// function giveCards() {
	// 	history.push(Routes.giveCards);
	// }

	// function readQrCode() {
	// 	history.push(Routes.qrcodeReader);
	// }

	return (
		<>
			<div className={style.actionButtonsContainer} style={{ zIndex: 10000 }}>
				{/* <Fab size="small" style={style.fab} onClick={giveCards}>
					<SwapVert />
				</Fab>
				{availablePacks > 0 && (
					<Fab size="small" style={style.fab} onClick={showPack}>
						<Receipt />
					</Fab>
				)}
				<Fab size="small" style={style.fab} onClick={readQrCode}>
					<PhotoCamera />
				</Fab> */}
			</div>
			<Map initialConfiguration={{ center: initialPlayerPosition, zoom: 18 }}>
				<PlayerOverlay />
				<MissionMarkers />
				<MemorablePlaces />
			</Map>
		</>
	);
}
