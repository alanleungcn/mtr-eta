import * as React from 'react';
import Div100vh from 'react-div-100vh';
import { Eta } from './views/Eta';
import { Selection } from './views/Selection';
import { AnimatePresence } from 'framer-motion';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';

export const App = () => {
	const location = useLocation();
	const history = useHistory();
	window.onbeforeunload = () => {
		history.replace('', undefined);
	};
	return (
		<Div100vh style={{ overflowX: 'hidden' }}>
			<AnimatePresence exitBeforeEnter initial={false}>
				<Switch location={location} key={location.pathname}>
					<Route path="/eta/:line/:station" component={Eta} />
					<Route path="/" component={Selection} />
				</Switch>
			</AnimatePresence>
		</Div100vh>
	);
};
