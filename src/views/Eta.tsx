import * as React from 'react';
import {
	Skeleton,
	Tag,
	Alert,
	AlertIcon,
	AlertTitle,
	IconButton,
	HStack,
	Flex,
	Stack,
	Box,
} from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import { TimeTable } from '../components/TimeTable';
import { dir } from '../assets/dir';
import { useTrain } from '../hooks/useTrain';
import { FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { lines } from '../assets/lines';
import { useTranslation } from 'react-i18next';

export interface Train {
	dest: string;
	plat: string;
	seq: string;
	time: string;
}

const wrapSkeleton = (loading: boolean, children: JSX.Element) => {
	return loading ? (
		<Stack>
			<Skeleton h="30px" />
			<Skeleton h="30px" />
			<Skeleton h="30px" />
			<Skeleton h="30px" />
		</Stack>
	) : (
		children
	);
};

export const Eta = () => {
	const { t } = useTranslation();
	const history = useHistory();
	const { line, station } = useParams<{ line: string; station: string }>();
	const [up, down, error, loading] = useTrain(line, station);
	const [upList, setUpList] = React.useState<Train[]>([]);
	const [downList, setDownList] = React.useState<Train[]>([]);
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
		up && setUpList(transEtaTime(up));
		down && setDownList(transEtaTime(down));
	};
	React.useEffect(
		setEtaText, // eslint-disable-next-line react-hooks/exhaustive-deps
		[loading]
	);
	React.useEffect(() => {
		const timer = setTimeout(setEtaText, 1000);
		return () => clearTimeout(timer);
	});
	return (
		<motion.div
			initial={history.location.state ? { x: '100vw', opacity: 0 } : undefined}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: '100vw', opacity: 0 }}
			transition={{
				type: 'tween',
				duration: 0.2,
				ease: 'anticipate',
			}}
			style={{
				width: '100%',
				height: '100%',
				maxWidth: 500,
				marginLeft: 'auto',
				marginRight: 'auto',
			}}
		>
			<Flex h="100%" direction="column" justify="center">
				<HStack position="absolute" top="5" left="2.5" spacing="2.5">
					<IconButton
						alignSelf="start"
						variant="ghost"
						aria-label="go back"
						icon={<FaArrowLeft />}
						onClick={() => history.push('/', { prev: '/eta' })}
					/>
					<Tag
						size="lg"
						color="white"
						backgroundColor={
							line === 'AEL'
								? '#1C7670'
								: line === 'TCL'
								? '#FE7F1D'
								: line === 'TML'
								? '#9A3B26'
								: '#6B208B'
						}
					>
						{`${t(line)} / ${t(station)}`}
					</Tag>
				</HStack>
				{station !== lines[line][lines[line].length - 1] && (
					<Box ml="2.5" mr="2.5">
						<Tag
							size="lg"
							alignSelf="start"
							m="5"
							ml="2.5"
							mt="10"
							colorScheme="green"
						>
							{`${t('To')} ${t(dir[line].up)}`}
						</Tag>
						{wrapSkeleton(loading, <TimeTable trainList={upList} />)}
					</Box>
				)}
				{station !== lines[line][0] && (
					<Box ml="2.5" mr="2.5">
						<Tag
							size="lg"
							alignSelf="start"
							m="5"
							ml="2.5"
							mt="10"
							colorScheme="red"
						>
							{`${t('To')} ${t(dir[line].down)}`}
						</Tag>
						{wrapSkeleton(loading, <TimeTable trainList={downList} />)}
					</Box>
				)}
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
			</Flex>
		</motion.div>
	);
};
