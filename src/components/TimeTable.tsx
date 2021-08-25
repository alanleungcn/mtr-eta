import * as React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { Train } from '../components/Eta';
import { codeToName } from '../utils/codeToName';

export const TimeTable = ({
	trainList,
}: {
	trainList: Train[] | undefined;
}) => {
	/* const [eta, setEta] = React.useState<string[]>([]);
	React.useEffect(() => {
		console.log('timetable trainlist update');
	}, [trainList]); */
	return (
		<Table size="sm">
			<Thead>
				<Tr>
					<Th>Destination</Th>
					<Th textAlign="center">Platform</Th>
					<Th isNumeric>Time</Th>
				</Tr>
			</Thead>
			<Tbody>
				{trainList &&
					trainList.map((train) => (
						<Tr key={train.seq}>
							<Td>{codeToName(train.dest)}</Td>
							<Td textAlign="center">{train.plat}</Td>
							<Td isNumeric>{train.time}</Td>
						</Tr>
					))}
			</Tbody>
		</Table>
	);
};
