import * as React from 'react';
import {
	VStack,
	Button,
	HStack,
	useTheme,
	useColorMode,
} from '@chakra-ui/react';
import Select from 'react-select';
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
import { dir } from '../assets/dir';
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
	option: (base: any, state: any) => ({
		...base,
		display: 'flex',
		alignItems: 'center',
		':before': {
			width: 25,
			height: 12.5,
			content: '""',
			marginRight: 10,
			borderRadius: 6.25,
			display: 'inline-block',
			backgroundColor: dir[state.data.value].color,
		},
	}),
	singleValue: (base: any, state: any) => ({
		...base,
		display: 'flex',
		alignItems: 'center',
		':before': {
			width: 25,
			height: 12.5,
			content: '""',
			marginRight: 10,
			borderRadius: 6.25,
			display: 'inline-block',
			backgroundColor: dir[state.data.value].color,
		},
	}),
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
	const onSelectedLineChange = (e: Option | null) => {
		setLine(e?.value);
		setStation(null);
	};
	const onSelectedStationChange = (e: Option | null) => {
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
								{selectedStation && (
									<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
										<Button variant="outline" onClick={viewEta}>
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
