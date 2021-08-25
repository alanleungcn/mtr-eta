import * as React from 'react';
import Div100vh from 'react-div-100vh';
import { Eta } from './components/Eta';
import { Selection } from './components/Selection';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const App = () => (
	<ChakraProvider theme={theme}>
		<Div100vh>
			<Router>
				<Switch>
					<Route path="/eta/:line/:station" component={Eta} />
					<Route path="/" component={Selection} />
				</Switch>
			</Router>
		</Div100vh>
	</ChakraProvider>
);
