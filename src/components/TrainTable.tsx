import * as React from 'react';
import { TrainList } from '../dataStructure';
import { useTranslation } from 'react-i18next';
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

interface Props {
  trainList: TrainList;
  noTrain: boolean;
}

export const TrainTable = ({ trainList, noTrain }: Props) => {
  const { t } = useTranslation();
  return noTrain ? (
    <Center h={24.5 + 33 * 4}>
      <Heading size="md" fontStyle="italic">
        {t('Not available')}
      </Heading>
    </Center>
  ) : (
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
  );
};
