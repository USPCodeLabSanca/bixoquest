import API from '../../api';

export async function donateStickers(stickers, userId) {
	await API.donationStickers(stickers, userId);

	return {
		type: 'DONATE_STICKERS',
		stickers,
	};
}
