import React from 'react';
import { useSelector } from 'react-redux';
import { makeCharacterPNG } from '../../lib/make-character-png';
import { io } from 'socket.io-client';
import BASE_URL, { SOCKET_PATH } from '../../constants/api-url';
import { initialPlayerPosition } from '../../constants/initial-player-position';

const context = React.createContext(null);

function createPlayer(user, characterPNG) {
	return {
		user,
		characterPNG,
		position: [0, 0],
	};
}

const serverSocket = io(BASE_URL, {
	path: SOCKET_PATH,
	requestTimeout: 100000,
	reconnectionDelay: 100000,
	randomizationFactor: 0,
});

serverSocket.on('error-message', (...args) => console.error('SOCKET ERROR', ...args));

export function PlayersContextProvider({ ...props }) {
	const user = useSelector(state => state.auth.user);
	const token = useSelector(state => state.auth.token);
	const [players, setPlayers] = React.useState();
	const [socket, setSocket] = React.useState();

	React.useEffect(() => {
		setSocket(serverSocket);

		async function makeUserPlayer() {
			const newUser = { ...user };
			const png = await makeCharacterPNG(user.character);
			const userPlayer = createPlayer(newUser, png);
			userPlayer.position = [...initialPlayerPosition];
			return userPlayer;
		}

		(async () => {
			const userPlayer = await makeUserPlayer();
			const newPlayers = { ...players, 'user-player': userPlayer };
			setPlayers(newPlayers);
		})();
	}, []);

	React.useEffect(() => {
		if (!socket) return;

		async function handlePlayerMove(eventData) {
			const { socketId, user, lat, lng } = eventData;
			const newPlayers = { ...players };
			if (players && players[socketId]) {
				newPlayers[socketId].position = [lat, lng];
				newPlayers[socketId].user = user;
			} else {
				const png = await makeCharacterPNG(user.character);
				const player = createPlayer(user, png);
				player.position = [lat, lng];
				newPlayers[socketId] = player;
			}
			setPlayers(newPlayers);
		}

		function handlePlayerDisconnect({ socketId }) {
			const newPlayers = { ...players };
			delete newPlayers[socketId];
			setPlayers(newPlayers);
		}

		socket.on('player-move', handlePlayerMove);
		socket.on('leave-game', handlePlayerDisconnect);
		// socket.on('join-game', handlePlayerJoing);

		return () => {
			socket.off('player-move', handlePlayerMove);
			socket.off('leave-game', handlePlayerDisconnect);
			// socket.off('join-game', handlePlayerDisconnect);
		};
	}, [socket, players]);

	// causes polling loop bug
	// function handlePlayerJoing() {
	// 	if (!userPlayer) return;
	// 	const { position } = userPlayer;
	// 	socket.emit('move', 'Bearer ' + token, position[0], position[1]);
	// }

	function movePlayer(lat, lng) {
		const newUserPlayer = { ...findPlayerBySocketId('user-player') };
		newUserPlayer.position = [lat, lng];
		const newPlayers = { ...players, 'user-player': newUserPlayer };
		setPlayers(newPlayers);
		socket.emit('move', 'Bearer ' + token, lat, lng);
	}

	function findPlayerBySocketId(socketId) {
		return players[socketId];
	}

	return (
		<context.Provider value={{ players, movePlayer, socket, findPlayerBySocketId }} {...props} />
	);
}

export function usePlayers() {
	return React.useContext(context);
}
