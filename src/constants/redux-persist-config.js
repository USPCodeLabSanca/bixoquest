import storage from 'redux-persist/lib/storage';

const ReduxPersistConfig = {
	storage,
	key: 'root',
	whitelist: ['auth'],
};

export default ReduxPersistConfig;
