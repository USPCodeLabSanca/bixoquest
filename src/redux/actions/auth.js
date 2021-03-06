import API, { silentAPI } from '../../api';

export async function rawSetUser(user) {
	return {
		type: 'SET_USER',
		user,
	};
}

export async function login(email, password) {
	const {
		data: { user },
	} = await API.login(email, password);
	return {
		type: 'SET_USER',
		user,
	};
}

export async function editProfile(newUser) {
	const { data: user } = await API.edit(newUser);
	return {
		type: 'SET_USER',
		user,
	};
}

export async function signup(newUser) {
	const {
		data: { user },
	} = await API.signup(newUser);
	return {
		type: 'SET_USER',
		user,
	};
}

export async function updateUser() {
	const { data: user } = await silentAPI.getUser();
	return {
		type: 'SET_USER',
		user: user,
	};
}

export function logout() {
	return { type: 'LOGOUT' };
}

/** @argument { string } token */
export function updateToken(token) {
	return {
		type: 'UPDATE_TOKEN',
		token,
	};
}
