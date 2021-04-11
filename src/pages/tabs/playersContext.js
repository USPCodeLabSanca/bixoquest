import React from 'react';
import { useSelector } from 'react-redux';
import { makeCharacterPNG } from '../../lib/make-character-png';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../../constants/api-url';

const context = React.createContext(null);

export function PlayersContextProvider({ ...props }) {
	const user = useSelector(state => state.auth.user);
	const [userPlayer, setUserPlayer] = React.useState(null);
	const [players, setPlayers] = React.useState([]);
	const socketRef = React.useRef();

	React.useEffect(() => {
		const socket = io(SOCKET_URL);
		socketRef.current = socket;
		socket.on('connection', () => {
			console.log('Connected');
		});
	}, []);

	function addPlayer(newPlayer) {
		setPlayers([...players, newPlayer]);
	}

	React.useEffect(() => {
		(async () => {
			const newUser = { ...user };
			const png = await makeCharacterPNG(user.character);
			newUser.characterPNG = png;
			setUserPlayer(newUser);
		})();
	}, [user]);

	const playersArray = [...players];
	if (userPlayer) playersArray.push(userPlayer);

	return <context.Provider value={{ players: playersArray }} {...props} />;
}

export function usePlayers() {
	return React.useContext(context);
}
