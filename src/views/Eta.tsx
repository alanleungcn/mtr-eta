import * as React from 'react';
import {
	VStack,
	Skeleton,
	Tag,
	Alert,
	AlertIcon,
	AlertTitle,
	IconButton,
	HStack,
} from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import { codeToName } from '../utils/codeToName';
import { TimeTable } from '../components/TimeTable';
import { dir } from '../assets/dir';
import { useTrain } from '../hooks/useTrain';
import { getEtaText } from '../utils/getEtaText';
import { FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

export interface Train {
	dest: string;
	plat: string;
	seq: string;
	time: string;
}

const wrapSkeleton = (loading: boolean, children: JSX.Element) => {
	return loading ? <Skeleton>{children}</Skeleton> : children;
};

export const Eta = () => {
	const history = useHistory();
	const { line, station } = useParams<{ line: string; station: string }>();
	const [up, down, error, loading] = useTrain(line, station);
	const [upList, setUpList] = React.useState<Train[]>([]);
	const [downList, setDownList] = React.useState<Train[]>([]);
	const transEtaTime = (arr: Train[]): Train[] => {
		const tmp: Train[] = [];
		for (let i = 0; i < arr.length; i++) {
			tmp[i] = {
				...arr[i],
				time: getEtaText(new Date(arr[i].time.replace(/\s/, 'T'))),
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
			initial={{ x: '100vw', opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: '100vw', opacity: 0 }}
			transition={{ type: 'tween', duration: 0.2, ease: 'anticipate' }}
			style={{ width: '100%', height: '100%' }}
		>
			<VStack spacing={50}>
				<HStack mt="25" w="100%" justify="center">
					<IconButton
						icon={<FaArrowLeft />}
						variant="ghost"
						aria-label="back"
						position="absolute"
						left="5"
						onClick={() => {
							history.goBack();
						}}
					/>
					<Tag
						mt="5"
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
						{`${codeToName(line)} | ${codeToName(station)}`}
					</Tag>
				</HStack>
				<VStack spacing={25} w="90%" maxW="750">
					<Tag size="lg" colorScheme="green" alignSelf="start">
						To {dir[line].up}
					</Tag>
					{wrapSkeleton(loading, <TimeTable trainList={upList} />)}
					<Tag size="lg" colorScheme="red" alignSelf="start">
						To {dir[line].down}
					</Tag>
					{wrapSkeleton(loading, <TimeTable trainList={downList} />)}
					{error && (
						<Alert status="error" variant="left-accent">
							<AlertIcon />
							<AlertTitle>{error?.isdelay && 'Train delayed'}</AlertTitle>
						</Alert>
					)}
				</VStack>
			</VStack>
		</motion.div>
	);
};
