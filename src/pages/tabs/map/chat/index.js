import React from 'react';
import { useSelector } from 'react-redux';

import Message from './message';
import { usePlayers } from '../../playersContext';

const style = {
	root: 'w-full absolute bottom-0 bg-white flex flex-col border-t border-gray-600 bg-gray-200',
	input: 'w-full p-2',
	button: 'border-l border-gray-600 p-2',
	form: 'border flex border-gray-600 bg-white',
	messagesContainer: 'h-full w-full p-2 flex flex-col overflow-y-auto',
	metaMessage: 'text-center text-sm text-gray-400',
};

function readableDate(date) {
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	return `${hours}h ${minutes}m`;
}

export default function Chat() {
	const { socket } = usePlayers();
	const currentUser = useSelector(state => state.auth.user);
	const token = useSelector(state => state.auth.token);
	const [messages, setMessages] = React.useState([]);
	const chatJoinDate = React.useRef(new Date());
	const messagesContainerRef = React.useRef();

	function handleMessageSubmit(event) {
		event.preventDefault();

		const text = event.target.message.value;

		if (!text) return;
		socket.emit('chat-message', 'Bearer ' + token, text);
		event.target.message.value = '';
		const newMessage = {
			text,
			date: new Date(),
			id: Math.random(),
			sender: currentUser,
			isCurrentUser: true,
		};
		setMessages([...messages, newMessage]);
		chatAutoScrollToBottom();
	}

	function chatAutoScrollToBottom() {
		const elem = messagesContainerRef.current;
		if (elem.clientHeight + elem.scrollTop === elem.scrollHeight) {
			setTimeout(() => elem.scroll(0, elem.scrollHeight));
		}
	}

	const handleReceiveMessage = React.useCallback(
		({ socketId: _socketId, user, message: { text, createdAt, _id } }) => {
			setMessages(oldMessages => {
				const newMessage = {
					text,
					date: new Date(createdAt),
					id: _id,
					sender: user,
					isCurrentUser: user.email === currentUser.email,
				};
				const newMessages = [...oldMessages, newMessage];
				while (newMessages.length > 50) newMessages.shift();
				chatAutoScrollToBottom();
				return newMessages;
			});
		},
		[currentUser],
	);

	React.useEffect(() => {
		if (!socket) return;

		socket.on('chat-message', handleReceiveMessage);
		return () => {
			socket.off('chat-message', handleReceiveMessage);
		};
	}, [socket, handleReceiveMessage]);

	return (
		<div
			className={style.root}
			style={{
				height: '40vh',
				zIndex: 99999,
				top: '100%',
			}}
		>
			<div className={style.messagesContainer} ref={messagesContainerRef}>
				<p className={style.metaMessage}>
					Você entrou no chat às {readableDate(chatJoinDate.current)}
				</p>
				{messages.map(message => (
					<Message key={message.id} message={message} />
				))}
			</div>
			<form className={style.form} onSubmit={handleMessageSubmit}>
				<input className={style.input} name="message" />
				<button className={style.button} type="submit">
					Enviar
				</button>
			</form>
		</div>
	);
}
