import React from 'react';
import { useSelector } from 'react-redux';
import { makeCharacterPNG } from '../../lib/make-character-png';
import { io } from 'socket.io-client';
import { SOCKET_PATH, SOCKET_URL } from '../../constants/api-url';

const context = React.createContext(null);

function createPlayer(user, characterPNG) {
	return {
		user,
		characterPNG,
		position: [0, 0],
	};
}

function geoToLatLng(geolocation) {
	if (!geolocation.isAvailable) return [null, null];
	const { latitude, longitude } = geolocation.position.coords;
	return [latitude, longitude];
}

export function PlayersContextProvider({ ...props }) {
	const geolocation = useSelector(state => state.geolocation);
	const user = useSelector(state => state.auth.user);
	const token = useSelector(state => state.auth.token);
	const [players, setPlayers] = React.useState({});
	const [socket, setSocket] = React.useState(null);

	const userPosition = geoToLatLng(geolocation);
	const hasPosition = userPosition.every(e => e);

	React.useEffect(() => {
		const socket = io(SOCKET_URL, { path: SOCKET_PATH });
		socket.on('error-message', (...args) => console.error('SOCKET ERROR', ...args));
		setSocket(socket);
	}, []);

	async function handlePlayerMove(eventData) {
		const { socketId, user, lat, lng } = eventData;
		const newPlayers = { ...players };
		if (players[socketId]) {
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

	function handlePlayerJoing() {
		if (!userPlayer) return;
		const { position } = userPlayer;
		socket.emit('move', 'Bearer ' + token, position[0], position[1]);
	}

	React.useEffect(() => {
		if (!socket) return;
		socket.on('player-move', handlePlayerMove);
		socket.on('leave-game', handlePlayerDisconnect);
		socket.on('join-game', handlePlayerJoing);

		return () => {
			socket.off('player-move', handlePlayerMove);
			socket.off('leave-game', handlePlayerDisconnect);
			socket.off('join-game', handlePlayerDisconnect);
		};
	}, [socket, players]);

	function movePlayer(lat, lng) {
		const newUserPlayer = { ...userPlayer };
		newUserPlayer.position = [lat, lng];
		const newPlayers = { ...players, 'user-player': newUserPlayer };
		setPlayers(newPlayers);
		socket.emit('move', 'Bearer ' + token, lat, lng);
	}

	React.useEffect(() => {
		if (!hasPosition || !socket) return;
		async function makeUserPlayer() {
			const newUser = { ...user };
			const png = await makeCharacterPNG(user.character);
			const userPlayer = createPlayer(newUser, png);
			userPlayer.position = userPosition;
			return userPlayer;
		}

		(async () => {
			const userPlayer = await makeUserPlayer();
			const newPlayers = { ...players, 'user-player': userPlayer };
			setPlayers(newPlayers);
			socket.emit('move', 'Bearer ' + token, userPlayer.position[0], userPlayer.position[1]);
		})();
	}, [socket, user, Boolean(hasPosition)]);

	const playersArray = Object.values(players);
	const userPlayer = players['user-player'];

	return <context.Provider value={{ players: playersArray, userPlayer, movePlayer }} {...props} />;
}

export function usePlayers() {
	return React.useContext(context);
}
