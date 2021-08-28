import './i18n';
import * as React from 'react';
import { App } from './App';
import ReactDOM from 'react-dom';
import { ColorModeScript, extendTheme, ThemeConfig } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';

const config: ThemeConfig = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

const theme = extendTheme({ config });

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<HelmetProvider>
				<Router>
					<App />
				</Router>
			</HelmetProvider>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
