import React from 'react';

import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BookIcon from '@material-ui/icons/ImportContacts';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';

import Routes from '../../constants/routes';

import Map from './map';
import Profile from './profile';
import MissionsTabs from './missions_tabs';
import { PlayersContextProvider } from './playersContext';

const style = {
	root: 'h-full flex-col flex bg-light-gray',
	main: 'h-full overflow-y-auto',
	footer: 'flex space-between bg-white shadow-lg w-full bg-white',
};

const TabOrder = [Routes.tabs.missionsTabs.missions, Routes.tabs.map, Routes.tabs.profile];

const PathToTabIndex = path => TabOrder.findIndex(s => s === path);

const TabIndexToPath = index => TabOrder[index];

export default function TabsScreen() {
	const location = useLocation();
	const [tabValue, setTabValue] = React.useState(PathToTabIndex(location.pathname));
	const history = useHistory();

	const handleChange = (_, newValue) => {
		history.push(TabIndexToPath(newValue));
		setTabValue(newValue);
	};

	return (
		<PlayersContextProvider>
			<div className={style.root}>
				<main className={style.main}>
					<Switch>
						<Route component={Map} path={Routes.tabs.map} />
						<Route component={Profile} path={Routes.tabs.profile} />
						<Route
							component={MissionsTabs}
							path={[Routes.tabs.missionsTabs.missions, Routes.tabs.missionsTabs.stickers]}
						/>
					</Switch>
				</main>
				<footer className={style.footer}>
					<Tabs value={tabValue} onChange={handleChange} variant="fullWidth" className="w-full">
						<Tab icon={<BookIcon />} />
						<Tab icon={<HomeIcon />} />
						<Tab icon={<PersonIcon />} />
					</Tabs>
				</footer>
			</div>
		</PlayersContextProvider>
	);
}
