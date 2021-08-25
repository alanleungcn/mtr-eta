import * as React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Heading } from '@chakra-ui/react';
import { Train } from '../views/Eta';
import { useTranslation } from 'react-i18next';

export const TimeTable = ({
	trainList,
}: {
	trainList: Train[] | undefined;
}) => {
	const { t } = useTranslation();
	return trainList && trainList.length > 0 ? (
		<Table size="sm">
			<Thead>
				<Tr>
					<Th pl="5">{t('Destination')}</Th>
					<Th textAlign="center">{t('Platform')}</Th>
					<Th isNumeric>{t('Time')}</Th>
				</Tr>
			</Thead>
			<Tbody>
				{trainList &&
					trainList.map((train) => (
						<Tr key={train.seq}>
							<Td pl="5">{t(train.dest)}</Td>
							<Td textAlign="center">{train.plat}</Td>
							<Td isNumeric>{train.time}</Td>
						</Tr>
					))}
			</Tbody>
		</Table>
	) : (
		<Heading size="md" fontStyle="italic" ml="10">
			{t('Not available')}
		</Heading>
	);
};
