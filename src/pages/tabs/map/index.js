import React from 'react';

// Material-ui imports
import Fab from '@material-ui/core/Fab';
import Chat from '@material-ui/icons/Chat';
import Receipt from '@material-ui/icons/Receipt';

// Library imports
import { useSelector } from 'react-redux';

// Redux actions imports
import * as ModalActions from '../../../redux/actions/modal';

// Components imports
import Map from '../../../components/map';
import PackModal from '../../../components/modals/packet';

// Images imports

import PlayerOverlay from './players-overlay';
import MissionMarkers from './mission-markers';
import { initialPlayerPosition } from '../../../constants/initial-player-position';
import MemorablePlaces from './memorable-places';
import ChatContainer from './chat';

const style = {
	root: 'w-full h-full relative',
	floatingContainer: 'w-full h-full absolute',
	actionButtonsContainer: 'absolute bottom-0 right-0 mr-4 mb-8 flex flex-col',
	fab: {
		margin: '8px 0',
		outline: 'none',
	},
};

export default function MapScreen() {
	const [isChatUp, setIsChatUp] = React.useState(false);
	const availablePacks = useSelector(state => state.auth.user.availablePacks);

	const showPack = ModalActions.useModal(() => <PackModal />);

	function toggleChat() {
		setIsChatUp(e => !e);
	}

	return (
		<div className={style.root}>
			<div
				className={style.floatingContainer}
				style={{ transition: 'bottom 200ms', bottom: isChatUp ? '40vh' : '0vh' }}
			>
				<div className={style.actionButtonsContainer} style={{ zIndex: 100000 }}>
					{availablePacks > 0 && (
						<Fab size="small" style={style.fab} onClick={showPack}>
							<Receipt />
						</Fab>
					)}
					<Fab size="small" style={style.fab} onClick={toggleChat}>
						<Chat />
					</Fab>
				</div>
				<ChatContainer />
			</div>
			<Map initialConfiguration={{ center: initialPlayerPosition, zoom: 18 }}>
				<PlayerOverlay />
				<MissionMarkers />
				<MemorablePlaces />
			</Map>
		</div>
	);
}
