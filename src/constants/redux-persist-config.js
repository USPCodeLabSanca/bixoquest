import storage from 'redux-persist/lib/storage';

const ReduxPersistConfig = {
	storage,
	key: 'root',
	version: 5, // Change the version to clear client state
	migrate: async (oldState, version) => {
		// If new version, clear state
		if (oldState._persist.version !== version) return {};
		else return oldState;
	},
	whitelist: ['auth'],
};

export default ReduxPersistConfig;
