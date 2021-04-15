import API from '../../api';

export async function addFriend(friendId) {
	await API.addFriend(friendId);
	return {
		type: 'ADD_FRIEND',
		friendId,
	};
}
