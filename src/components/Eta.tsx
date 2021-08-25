import * as React from 'react';
import {
	VStack,
	Skeleton,
	Tag,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { codeToName } from '../utils/codeToName';
import { TimeTable } from './TimeTable';
import { dir } from '../assets/dir';
import { useTrain } from '../hooks/useTrain';

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
	const { line, station } = useParams<{ line: string; station: string }>();
	const [up, down, error, loading] = useTrain(line, station);
	const [upList, setUpList] = React.useState<Train[]>();
	const [downList, setDownList] = React.useState<Train[]>();
	React.useEffect(() => {
		console.log(up, down);
		if (!up) return;
		const newUp = [...up];
		up?.forEach((train, i) => {
			newUp[i].time = i.toString();
		});
		setUpList(newUp);
	}, [up]);
	return (
		<VStack spacing={50}>
			<Tag
				mt="50"
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
						<AlertTitle mr={2}>{error?.isdelay && 'Train delayed'}</AlertTitle>
						<AlertDescription>{error?.message}</AlertDescription>
					</Alert>
				)}
			</VStack>
		</VStack>
	);
};
