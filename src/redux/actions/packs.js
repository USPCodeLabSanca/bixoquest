export function openPack(stickerId) {
	return {
		type: 'OPEN_PACK',
		stickerId,
	};
}

export function openSpecialPack(specialStickerId) {
	return {
		type: 'OPEN_SPECIAL_PACK',
		specialStickerId,
	};
}
