import * as React from 'react';
import { App } from './App';
import './i18n';
import ReactDOM from 'react-dom';
import { ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.render(
	<React.StrictMode>
		<ColorModeScript initialColorMode="light" />
		<HelmetProvider>
			<ChakraProvider theme={theme}>
				<Router>
					<App />
				</Router>
			</ChakraProvider>
		</HelmetProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
