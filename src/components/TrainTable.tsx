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

export const TrainTable = ({ trainList }: { trainList: Train[] }) => {
  const { t } = useTranslation();
  return trainList.length > 0 ? (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th w="35%">{t('Destination')}</Th>
          <Th textAlign="center" w="30%">
            {t('Platform')}
          </Th>
          <Th isNumeric w="35%">
            {t('Time')}
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {trainList.map((train) => (
          <Tr key={train.seq}>
            <Td w="35%">{t(train.dest)}</Td>
            <Td textAlign="center" w="30%">
              {train.plat}
            </Td>
            <Td isNumeric w="35%">
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
