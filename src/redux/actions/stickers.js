import API from '../../api';

export async function donateStickers(stickers, userId) {
	await API.donationStickers(stickers, userId);

	return {
		type: 'DONATE_STICKERS',
		stickers,
	};
}

export async function donateSpecialStickers(specialStickers, userId) {
	await API.donationSpecialStickers(specialStickers, userId);

	return {
		type: 'DONATE_SPECIAL_STICKERS',
		specialStickers,
	};
}
