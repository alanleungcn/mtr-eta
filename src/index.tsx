import './i18n';
import * as React from 'react';
import { App } from './App';
import ReactDOM from 'react-dom';
import { ColorModeScript, theme } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.render(
	<React.StrictMode>
		<ColorModeScript initialColorMode="dark" />
		<ChakraProvider theme={theme}>
			<HelmetProvider>
				<Router>
					<App />
				</Router>
			</HelmetProvider>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
