import { createMuiTheme } from '@material-ui/core';

const MuiTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#45AAF2',
			contrastText: 'white',
		},
		secondary: {
			main: '#FA8231',
			contrastText: 'white',
		},
	},
});

export default MuiTheme;
