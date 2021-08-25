import * as React from 'react';
import {
	VStack,
	Button,
	HStack,
	useTheme,
	useColorMode,
	Image,
} from '@chakra-ui/react';
import { getLinesOpt } from '../utils/getLinesOpt';
import Select from 'react-select';
import { getStationsOpt } from '../utils/getStationsOpt';
import { Footer } from './Footer';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { ColorModeSwitcher } from './ColorModeSwitcher';

export interface Option {
	value: string;
	label: string;
}

const customWidth = {
	container: (base: any) => ({
		...base,
		width: '75%',
		maxWidth: '500px',
	}),
};

const lineColor = {
	option: (provided: any, state: any) => ({
		...provided,
		':before': {
			width: 20,
			height: 10,
			content: '""',
			marginRight: 10,
			borderRadius: 10,
			display: 'inline-block',
			backgroundColor:
				state.value === 'AEL'
					? '#1C7670'
					: state.value === 'TCL'
					? '#FE7F1D'
					: state.value === 'TML'
					? '#9A3B26'
					: '#6B208B',
		},
	}),
	singleValue: (provided: any, state: any) => ({
		...provided,
		':before': {
			width: 20,
			height: 10,
			content: '""',
			marginRight: 10,
			borderRadius: 10,
			display: 'inline-block',
			backgroundColor:
				state.data.value === 'AEL'
					? '#1C7670'
					: state.data.value === 'TCL'
					? '#FE7F1D'
					: state.data.value === 'TML'
					? '#9A3B26'
					: '#6B208B',
		},
	}),
};

export const Selection = () => {
	const { colorMode } = useColorMode();
	const history = useHistory();
	const linesOpt = getLinesOpt();
	const [stationsOpt, setStationsOpt] = React.useState<Option[]>([]);
	const [selectedLine, setSelectedLine] = React.useState<Option | null>(null);
	const [selectedStation, setSelectedStation] = React.useState<Option | null>(
		null
	);
	const [cookies, setCookie, removeCookie] = useCookies([
		'selectedLine',
		'selectedStation',
	]);
	React.useEffect(() => {
		cookies.selectedLine && setSelectedLine(cookies.selectedLine);
		cookies.selectedStation && setSelectedStation(cookies.selectedStation);
		setStationsOpt(getStationsOpt(cookies.selectedLine?.value));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const onSelectedLineChange = (e: Option | null) => {
		setSelectedLine(e);
		setSelectedStation(null);
		removeCookie('selectedStation');
		setStationsOpt(getStationsOpt(e?.value));
		setCookie('selectedLine', e);
	};
	const onSelectedStationChange = (e: Option | null) => {
		setSelectedStation(e);
		setCookie('selectedStation', e);
	};
	const onReset = () => {
		setSelectedLine(null);
		setSelectedStation(null);
		removeCookie('selectedLine');
		removeCookie('selectedStation');
		setStationsOpt(getStationsOpt(undefined));
	};
	const viewEta = () => {
		history.push(`/eta/${selectedLine?.value}/${selectedStation?.value}`);
	};
	const theme = useTheme();
	const selectColor = {
		neutral0: theme.colors.gray[800],
		neutral80: theme.colors.white,
		primary: theme.colors.blue[400],
		primary25: theme.colors.blue[900],
		primary50: theme.colors.blue[900],
	};
	return (
		<VStack spacing="25px" h="100%" justify="center">
			<Image
				src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/locomotive_1f682.png"
				alt="logo"
				boxSize="100px"
			/>

			<Select
				options={linesOpt}
				value={selectedLine}
				isSearchable={false}
				placeholder="Select line..."
				onChange={(e) => onSelectedLineChange(e)}
				styles={{ ...lineColor, ...customWidth }}
				theme={
					colorMode === 'dark'
						? (theme) => ({
								...theme,
								colors: {
									...theme.colors,
									...selectColor,
								},
						  })
						: undefined
				}
			/>
			<Select
				styles={customWidth}
				options={stationsOpt}
				value={selectedStation}
				placeholder="Select station..."
				onChange={(e) => onSelectedStationChange(e)}
				theme={
					colorMode === 'dark'
						? (theme) => ({
								...theme,
								colors: {
									...theme.colors,
									...selectColor,
								},
						  })
						: undefined
				}
			/>
			{selectedStation && (
				<VStack spacing="25px">
					<HStack spacing="25px">
						<Button variant="outline" onClick={viewEta}>
							ETA
						</Button>
						<Button variant="outline" onClick={onReset}>
							Reset
						</Button>
					</HStack>
					<Footer code={selectedStation.value.toLowerCase()} />
				</VStack>
			)}
			<ColorModeSwitcher />
		</VStack>
	);
};
