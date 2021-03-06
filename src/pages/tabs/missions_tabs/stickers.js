import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import STICKERS_DATA from '../../../constants/stickers';
import { updateUser as updateUserAction } from '../../../redux/actions/auth';

import PropTypes from 'prop-types';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const style = {
	root: 'h-full overflow-auto',
	nav: 'flex space-between shadow-lg w-full bg-white',
	center: 'flex justify-center',
	pagina: {
		width: '210px',
		height: '297px',
		zoom: '1.5',
		marginBottom: '8px',
		backgroundSize: 'contain',
	},
	paginaClass: 'shadow-lg',
	sticker: {
		height: '33.4%',
		backgroundImage: `url(${STICKERS_DATA.placeholder})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
		backgroundColor: '#62b9da',
		border: '0.5px solid white',
		color: 'white',
		padding: '3px',
	},
	discoveredSticker: { backgroundColor: 'transparent', backgroundImage: 'none', border: 'none' },
};

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-force-tabpanel-${index}`}
			aria-labelledby={`scrollable-force-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</Typography>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		'id': `scrollable-force-tab-${index}`,
		'aria-controls': `scrollable-force-tabpanel-${index}`,
	};
}

export default function Stickers() {
	const user = useSelector(state => state.auth.user);
	const dispatch = useDispatch();
	const [value, setValue] = React.useState(0);

	React.useEffect(() => {
		(async () => {
			dispatch(await updateUserAction());
		})();
	}, []);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={style.root}>
			<nav className={style.nav}>
				<Tabs
					value={value}
					onChange={handleChange}
					variant="scrollable"
					scrollButtons="on"
					aria-label="scrollable force tabs example"
				>
					{STICKERS_DATA.pages.map((page_image, index) => (
						<Tab label={index + 1} key={index} {...a11yProps(index)} />
					))}
          {STICKERS_DATA.specialPages.map((page_image, index) => (
						<Tab label={STICKERS_DATA.pages.length + index + 1} key={STICKERS_DATA.pages.length + index} {...a11yProps(STICKERS_DATA.pages.length + index)} />
					))}
				</Tabs>
			</nav>

			<div className={style.center}>
				{STICKERS_DATA.pages.map((page_image, index) => (
					<TabPanel value={value} index={index} key={index}>
						<Grid
							container
							className={style.paginaClass}
							style={{
								...style.pagina,
								...{ backgroundImage: `url(${page_image})` },
							}}
							direction="row"
							justify="center"
							alignItems="center"
						>
							{[...Array(9)].map((x, i) => (
								<Grid
									key={i}
									container
									item
									xs={4}
									style={{
										...style.sticker,
										...(user.stickers.includes(i + index * 9) ? style.discoveredSticker : {}),
									}}
									direction="row"
									alignItems="flex-end"
								>
									{i + 1 + index * 9}
								</Grid>
							))}
						</Grid>
					</TabPanel>
				))}
        {STICKERS_DATA.specialPages.map((page_image, index) => (
					<TabPanel
            value={value}
            index={STICKERS_DATA.pages.length + index}
            key={STICKERS_DATA.pages.length + index}
          >
						<Grid
							container
							className={style.paginaClass}
							style={{
								...style.pagina,
								...{ backgroundImage: `url(${page_image})` },
							}}
							direction="row"
							justify="center"
							alignItems="center"
						>
							{[...Array(9)].map((x, i) => (
								<Grid
									key={i}
									container
									item
									xs={4}
									style={{
										...style.sticker,
										...(user.specialStickers.includes(i + index * 9) ? style.discoveredSticker : {}),
									}}
									direction="row"
									alignItems="flex-end"
								>
									{i + 1 + index * 9}
								</Grid>
							))}
						</Grid>
					</TabPanel>
				))}
			</div>
		</div>
	);
}
