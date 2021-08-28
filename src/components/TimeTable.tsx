import * as React from 'react';
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Heading,
	Center,
} from '@chakra-ui/react';
import { Train } from '../views/Eta';
import { useTranslation } from 'react-i18next';

export const TimeTable = ({ trainList }: { trainList: Train[] }) => {
	const { t } = useTranslation();
	return trainList.length > 0 ? (
		<Table size="sm">
			<Thead>
				<Tr>
					<Th w="40%">{t('Destination')}</Th>
					<Th textAlign="center">{t('Platform')}</Th>
					<Th isNumeric w="40%">
						{t('Time')}
					</Th>
				</Tr>
			</Thead>
			<Tbody>
				{trainList &&
					trainList.map((train) => (
						<Tr key={train.seq}>
							<Td w="40%" fontSize="15">
								{t(train.dest)}
							</Td>
							<Td textAlign="center" fontSize="15">
								{train.plat}
							</Td>
							<Td isNumeric w="40%" fontSize="15">
								{train.time}
							</Td>
						</Tr>
					))}
			</Tbody>
		</Table>
	) : (
		<Center>
			<Heading size="md" fontStyle="italic">
				{t('Not available')}
			</Heading>
		</Center>
	);
};
