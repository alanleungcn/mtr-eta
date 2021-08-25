import * as React from 'react';
import {
	VStack,
	Button,
	HStack,
	useTheme,
	useColorMode,
	Image,
	IconButton,
} from '@chakra-ui/react';
import Select from 'react-select';
import { Footer } from '../components/Footer';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaLanguage } from 'react-icons/fa';
import i18next from 'i18next';
import { useStationsOpt } from '../hooks/useStationsOpt';
import { useLinesOpt } from '../hooks/useLinesOpt';

export interface Option {
	value: string;
	label: string;
}

const customWidth = {
	container: (base: any) => ({
		...base,
		width: '75%',
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
	const linesOpt = useLinesOpt();
	const { t } = useTranslation();
	//const [stationsOpt, setStationsOpt] = React.useState<Option[]>([]);
	const [selectedLine, setSelectedLine] = React.useState<Option | null>(null);
	const [selectedStation, setSelectedStation] = React.useState<Option | null>(
		null
	);
	const stationsOpt = useStationsOpt(
		selectedLine ? selectedLine.value : undefined
	);
	const [cookies, setCookie, removeCookie] = useCookies([
		'selectedLine',
		'selectedStation',
	]);
	React.useEffect(() => {
		cookies.selectedLine &&
			setSelectedLine({
				value: cookies.selectedLine.value,
				label: t(cookies.selectedLine.value),
			});
		cookies.selectedStation &&
			setSelectedStation({
				value: cookies.selectedStation.value,
				label: t(cookies.selectedStation.value),
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const onSelectedLineChange = (e: Option | null) => {
		setSelectedLine(e);
		setSelectedStation(null);
		removeCookie('selectedStation');
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
	};
	const viewEta = () => {
		history.push(`/eta/${selectedLine?.value}/${selectedStation?.value}`, {
			prev: '/',
		});
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
		<motion.div
			initial={history.location.state ? { x: '-100vw', opacity: 0 } : undefined}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: '-100vw', opacity: 0 }}
			transition={{ type: 'tween', duration: 0.2, ease: 'easeIn' }}
			style={{
				width: '100%',
				height: '100%',
				maxWidth: 500,
				marginLeft: 'auto',
				marginRight: 'auto',
			}}
		>
			<VStack spacing="25" h="100%" justify="center">
				<Image src="/favicon.png" boxSize="100px" />
				<Select
					options={linesOpt}
					value={selectedLine}
					isSearchable={false}
					placeholder={t('Select line...')}
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
					isSearchable={false}
					value={selectedStation}
					placeholder={t('Select station...')}
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
				<VStack spacing="25">
					<HStack spacing="25">
						<IconButton
							icon={<FaLanguage />}
							variant="outline"
							aria-label="change language"
							onClick={() =>
								i18next
									.changeLanguage(i18next.language === 'en' ? 'zh' : 'en')
									.then(() => {
										selectedLine &&
											setSelectedLine({
												value: selectedLine.value,
												label: t(selectedLine.value),
											});
										selectedStation &&
											setSelectedStation({
												value: selectedStation.value,
												label: t(selectedStation.value),
											});
									})
							}
						/>

						<ColorModeSwitcher />
						{selectedStation && (
							<HStack spacing="25">
								<Button variant="outline" onClick={onReset}>
									{t('Reset')}
								</Button>
								<Button variant="outline" onClick={viewEta}>
									{t('ETA')}
								</Button>
							</HStack>
						)}
					</HStack>
					{selectedStation && (
						<Footer code={selectedStation.value.toLowerCase()} />
					)}
				</VStack>
			</VStack>
		</motion.div>
	);
};
