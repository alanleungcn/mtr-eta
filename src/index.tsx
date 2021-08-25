import * as React from 'react';
import { App } from './App';
import './i18n';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import { ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';

ReactDOM.render(
	<React.StrictMode>
		<ColorModeScript initialColorMode="light" />
		<CookiesProvider>
			<ChakraProvider theme={theme}>
				<Router>
					<App />
				</Router>
			</ChakraProvider>
		</CookiesProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
