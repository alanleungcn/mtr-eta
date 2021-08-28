import * as React from 'react';
import {
	VStack,
	Button,
	HStack,
	useTheme,
	useColorMode,
	Badge,
} from '@chakra-ui/react';
import Select, { components } from 'react-select';
import { Footer } from '../components/Footer';
import { useHistory } from 'react-router-dom';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';
import { motion, AnimateSharedLayout, MotionConfig } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useStationsOpt } from '../hooks/useStationsOpt';
import { useLinesOpt } from '../hooks/useLinesOpt';
import { Helmet } from 'react-helmet-async';
import { useSelected } from '../hooks/useSelected';
import { LangSwitcher } from '../components/LangSwitcher';
import { Icon } from '../components/Icon';
import { lines } from '../assets/lines';
export interface IOption {
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
	option: (base: any, state: any) => ({
		...base,
		display: 'flex',
		overflow: 'visible',
		alignItems: 'center',
		':before': {
			width: 25,
			height: 12.5,
			content: '""',
			marginRight: 10,
			borderRadius: 6.25,
			display: 'inline-block',
			boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
			backgroundColor: lines[state.data.value].color,
		},
	}),
	singleValue: (base: any, state: any) => ({
		...base,
		display: 'flex',
		overflow: 'visible',
		alignItems: 'center',
		':before': {
			width: 25,
			height: 12.5,
			content: '""',
			marginRight: 10,
			borderRadius: 6.25,
			display: 'inline-block',
			boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
			backgroundColor: lines[state.data.value].color,
		},
	}),
};

const Option = (props: any) => {
	const { t } = useTranslation();
	return (
		<components.Option {...props}>
			{props.label}
			{lines[props.value].eta && (
				<Badge colorScheme="red" variant="solid" ml="auto">
					{t('ETA')}
				</Badge>
			)}
		</components.Option>
	);
};

const NoOptionsMessage = (props: any) => {
	const { t } = useTranslation();
	return (
		<components.NoOptionsMessage {...props}>
			<span>{t('No options')}</span>
		</components.NoOptionsMessage>
	);
};

export const Selection = () => {
	const history = useHistory();
	const linesOpt = useLinesOpt();
	const { t } = useTranslation();
	const { colorMode } = useColorMode();
	const [
		selectedLine,
		selectedStation,
		setLine,
		setStation,
		loading,
	] = useSelected();
	const stationsOpt = useStationsOpt(selectedLine?.value);
	const onSelectedLineChange = (e: IOption | null) => {
		setLine(e?.value);
		setStation(null);
	};
	const onSelectedStationChange = (e: IOption | null) => {
		setStation(e?.value);
	};
	const onReset = () => {
		setLine(null);
		setStation(null);
	};
	const viewEta = () => {
		history.push(`/eta/${selectedLine?.value}/${selectedStation?.value}`, {
			prev: '/',
		});
	};
	const theme = useTheme();
	const selectColor = {
		primary: theme.colors.blue[400], // selected
		primary25: theme.colors.whiteAlpha[200], // hover
		primary50: theme.colors.whiteAlpha[400], // active
		neutral0: theme.colors.gray[800], // background
		neutral20: theme.colors.whiteAlpha[300], // border
		neutral80: theme.colors.whiteAlpha[900], // text
	};
	return (
		<motion.div
			initial={{ x: '-100vw', opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{
				type: 'spring',
				duration: 0.25,
			}}
			style={{
				width: '100%',
				height: '100%',
				maxWidth: 500,
				marginLeft: 'auto',
				marginRight: 'auto',
			}}
		>
			{!loading && (
				<MotionConfig
					transition={{
						type: 'spring',
						duration: 0.25,
					}}
				>
					<AnimateSharedLayout>
						<VStack spacing="25" h="100%" justify="center">
							<Helmet>
								<title>MTR ETA</title>
								<meta
									name="theme-color"
									content={
										colorMode === 'dark'
											? theme.colors.gray[800]
											: theme.colors.whiteAlpha[900]
									}
								/>
							</Helmet>
							<motion.div layout style={{ width: '100%' }}>
								<VStack spacing="25">
									<Icon />
									<Select
										options={linesOpt}
										value={selectedLine}
										isSearchable={false}
										placeholder={t('Select line...')}
										onChange={(e) => onSelectedLineChange(e)}
										components={{ Option, NoOptionsMessage }}
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
										components={{ NoOptionsMessage }}
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
								</VStack>
							</motion.div>
							<HStack spacing="25">
								<motion.div layout>
									<HStack spacing="25">
										<LangSwitcher
											onLangChange={() => {
												setLine(selectedLine?.value ?? null);
												setStation(selectedStation?.value ?? null);
											}}
										/>
										<ColorModeSwitcher />
									</HStack>
								</motion.div>
								{selectedLine && (
									<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
										<Button variant="outline" onClick={onReset}>
											{t('Reset')}
										</Button>
									</motion.div>
								)}
								{selectedLine && selectedStation && (
									<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
										<Button
											variant="outline"
											onClick={viewEta}
											disabled={!lines[selectedLine.value].eta}
										>
											{t('ETA')}
										</Button>
									</motion.div>
								)}
							</HStack>
							{selectedStation && (
								<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
									<Footer code={selectedStation.value.toLowerCase()} />
								</motion.div>
							)}
						</VStack>
					</AnimateSharedLayout>
				</MotionConfig>
			)}
		</motion.div>
	);
};
