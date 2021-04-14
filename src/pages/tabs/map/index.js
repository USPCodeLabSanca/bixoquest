import React from 'react';

// Material-ui imports
import Fab from '@material-ui/core/Fab';

// Library imports
import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';

// Redux actions imports
import * as ModalActions from '../../../redux/actions/modal';

// Components imports
import Map from '../../../components/map';
import PackModal from '../../../components/modals/packet';

// MISC imports
// import Routes from '../../../constants/routes';

// Images imports
import Chat from '@material-ui/icons/Chat';
import Receipt from '@material-ui/icons/Receipt';
// import SwapVert from '@material-ui/icons/SwapVert';

import PlayerOverlay from './players-overlay';
import MissionMarkers from './mission-markers';
import { initialPlayerPosition } from '../../../constants/initial-player-position';
import MemorablePlaces from './memorable-places';
import ChatContainer from './chat';
import { usePlayers } from '../playersContext';

const style = {
	root: 'w-full h-full relative',
	floatingContainer: 'w-full h-full absolute bottom-0 flex flex-col justify-end items-end',
	actionButtonsContainer: 'relative w-max mr-4 mb-8 flex flex-col',
	fab: {
		margin: '8px 0',
		outline: 'none',
		position: 'static',
	},
};

export default function MapScreen() {
  const { players } = usePlayers();
	// const history = useHistory();
	const [isChatUp, setIsChatUp] = React.useState(false);
	const availablePacks = useSelector(state => state.auth.user.availablePacks);

	const showPack = ModalActions.useModal(() => <PackModal />);

	// function giveCards() {
	// 	history.push(Routes.giveCards);
	// }

	function toggleChat() {
		setIsChatUp(e => !e);
	}

	return (
		<div className={style.root}>
			<div className={style.floatingContainer}>
				<div className={style.actionButtonsContainer} style={{ zIndex: 500 }}>
					{/* <Fab size="small" style={style.fab} onClick={giveCards}>
						<SwapVert />
					</Fab> */}
					{availablePacks > 0 && (
						<Fab size="small" style={style.fab} onClick={showPack}>
							<Receipt />
						</Fab>
					)}
					<Fab size="small" style={style.fab} onClick={toggleChat}>
						<Chat />
					</Fab>
				</div>
				<ChatContainer isChatUp={isChatUp} />
			</div>
			<Map initialConfiguration={{ center: initialPlayerPosition, zoom: 18 }}>
        {
				  players && <PlayerOverlay />
        }
        {
				  players && <MissionMarkers />
        }
				<MemorablePlaces />
			</Map>
		</div>
	);
}
