// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer, toast } from 'react-toastify';

// Custom
import MuiTheme from './MuiTheme';
import routes from './constants/routes';
import { store, persistor } from './redux/store';
import { updateToken } from './redux/actions/auth';
import { initializeAPI } from './api/base-api';
import APIBaseURL from './constants/api-url';
import ModalRenderer from './services/modal-renderer';
import { requiresAuthentication, requiresNoAuthentication } from './lib/auth-checker';

// Pages
import Tabs from './pages/tabs';
import Login from './pages/login';
import Signup from './pages/signup';
import GiveCards from './pages/give-cards/index.js';
import ReceiveCards from './pages/receive-cards/index.js';

// CSS
import './main-style.css';
import 'react-toastify/dist/ReactToastify.min.css';

initializeAPI({
	baseURL: APIBaseURL,
	tokenSelector: () => store.getState().auth.token,
	tokenDispatcher: newToken => store.dispatch(updateToken(newToken)),
	onError: message => toast.error(message),
});

function App() {
	return (
		<ThemeProvider theme={MuiTheme}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<ModalRenderer />
					<BrowserRouter>
						<Switch>
							<Route
								path={[
									routes.tabs.map,
									routes.tabs.profile,
									routes.tabs.missionsTabs.missions,
									routes.tabs.missionsTabs.stickers,
								]}
								component={requiresAuthentication(Tabs)}
							/>
							<Route path={routes.login} component={requiresNoAuthentication(Login)} />
							<Route path={routes.signup} component={requiresNoAuthentication(Signup)} />
							<Route path={routes.giveCards} component={requiresAuthentication(GiveCards)} />
							<Route path={routes.receiveCards} component={requiresAuthentication(ReceiveCards)} />
							<Redirect to={routes.login} />
						</Switch>
					</BrowserRouter>
					<ToastContainer hideProgressBar />
				</PersistGate>
			</Provider>
		</ThemeProvider>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
