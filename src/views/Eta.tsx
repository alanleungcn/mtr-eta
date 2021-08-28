import * as React from 'react';
import {
	Tag,
	Alert,
	AlertIcon,
	AlertTitle,
	IconButton,
	HStack,
	Flex,
	Spinner,
	Stack,
	Center,
} from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import { TimeTable } from '../components/TimeTable';
import { lines } from '../assets/lines';
import { useTrain } from '../hooks/useTrain';
import { FaArrowLeft } from 'react-icons/fa';
import { AnimateSharedLayout, motion, MotionConfig } from 'framer-motion';
import { stations } from '../assets/stations';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

export interface Train {
	dest: string;
	plat: string;
	seq: string;
	time: string;
}

export const Eta = () => {
	const { t } = useTranslation();
	const history = useHistory();
	const { line, station } = useParams<{ line: string; station: string }>();
	const [up, down, error, loading] = useTrain(line, station);
	const [upList, setUpList] = React.useState<Train[] | undefined>(undefined);
	const [downList, setDownList] = React.useState<Train[] | undefined>(
		undefined
	);
	const getEtaTime = (from: Date): string => {
		const ms = +from - +new Date();
		const min = ms / 60000;
		return min <= 0
			? t('Departing')
			: min < 1
			? t('Arriving')
			: `${min.toFixed(0)} ${t('min')}`;
	};
	const transEtaTime = (arr: Train[]): Train[] => {
		const tmp: Train[] = [];
		for (let i = 0; i < arr.length; i++) {
			tmp[i] = {
				...arr[i],
				time: getEtaTime(new Date(arr[i].time.replace(/\s/, 'T'))),
			};
		}
		return tmp;
	};
	const setEtaText = () => {
		if (loading) return;
		up && setUpList(transEtaTime(up));
		down && setDownList(transEtaTime(down));
	};
	React.useEffect(() => {
		setEtaText();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);
	React.useEffect(() => {
		const timer = setTimeout(setEtaText, 5000);
		return () => clearTimeout(timer);
	});
	const [animComplete, setAnimComplete] = React.useState(
		history.location.state ? false : true
	);
	return (
		<motion.div
			initial={{ x: '100vw', opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ type: 'spring', duration: 0.25 }}
			style={{
				maxWidth: 500,
				marginLeft: 'auto',
				marginRight: 'auto',
				width: '100vw',
				height: '100%',
			}}
			onAnimationComplete={() => setAnimComplete(true)}
		>
			<Helmet>
				<title>{`${t(line)} / ${t(station)}`}</title>
			</Helmet>
			<Flex h="100%" direction="column">
				<HStack mt="19" ml="2.5" spacing="2.5">
					<IconButton
						variant="ghost"
						aria-label="back"
						icon={<FaArrowLeft />}
						onClick={() => history.push('/', { prev: '/eta' })}
					/>
					<Tag size="lg" color="white" backgroundColor={lines[line].color}>
						{`${t(line)} / ${t(station)}`}
					</Tag>
				</HStack>
				<Stack spacing="10" h="100%" justify="center" mx="2.5">
					<MotionConfig transition={{ type: 'spring', duration: 0.25 }}>
						{station !== stations[line][stations[line].length - 1] && (
							<AnimateSharedLayout>
								<Stack>
									<motion.div layout style={{ width: '100%' }}>
										<Tag
											ml="2.5"
											mb="2.5"
											size="lg"
											alignSelf="start"
											colorScheme="green"
										>
											{`${t('To')} ${t(lines[line].up)}`}
										</Tag>
									</motion.div>
									<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
										{upList && animComplete ? (
											<TimeTable trainList={upList} />
										) : (
											<Center h="157">
												<Spinner />
											</Center>
										)}
									</motion.div>
								</Stack>
							</AnimateSharedLayout>
						)}
						{station !== stations[line][0] && (
							<AnimateSharedLayout>
								<Stack>
									<motion.div layout style={{ width: '100%' }}>
										<Tag
											ml="2.5"
											mb="2.5"
											size="lg"
											alignSelf="start"
											colorScheme="red"
										>
											{`${t('To')} ${t(lines[line].down)}`}
										</Tag>
									</motion.div>
									<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
										{downList && animComplete ? (
											<TimeTable trainList={downList} />
										) : (
											<Center h="157">
												<Spinner />
											</Center>
										)}
									</motion.div>
								</Stack>
							</AnimateSharedLayout>
						)}
					</MotionConfig>
				</Stack>
			</Flex>
			{error && (
				<Alert
					status="error"
					variant="left-accent"
					position="absolute"
					bottom="0"
				>
					<AlertIcon />
					<AlertTitle>
						{error.isdelay
							? t('Train delayed')
							: t('Oops! Something went wrong')}
					</AlertTitle>
				</Alert>
			)}
		</motion.div>
	);
};
