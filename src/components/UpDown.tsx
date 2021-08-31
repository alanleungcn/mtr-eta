import * as React from 'react';
import { lines } from '../assets/lines';
import { TrainList } from '../dataStructure';
import { stations } from '../assets/stations';
import { useTranslation } from 'react-i18next';
import { TrainTable } from '../components/TrainTable';
import { Tag, Spinner, Stack, Center } from '@chakra-ui/react';
import { AnimateSharedLayout, motion, MotionConfig } from 'framer-motion';

interface Props {
  up: TrainList | undefined;
  down: TrainList | undefined;
  line: string;
  station: string;
}

export const UpDown = ({ up, down, line, station }: Props) => {
  const { t } = useTranslation();
  return (
    <Stack mx="2.5" spacing="10">
      <MotionConfig
        transition={{
          type: 'spring',
          duration: 0.5,
        }}
      >
        <AnimateSharedLayout>
          {station !== stations[line][stations[line].length - 1] && (
            <Stack spacing="2.5">
              <motion.div layout>
                <Tag size="lg" colorScheme="green">
                  {`${t('To')} ${t(lines[line].up)}`}
                </Tag>
              </motion.div>
              <motion.div layout="position">
                {up ? (
                  <TrainTable trainList={up} noTrain={up.length === 0} />
                ) : (
                  <Center h={24.5 + 33 * 4}>
                    <Spinner />
                  </Center>
                )}
              </motion.div>
            </Stack>
          )}
          {station !== stations[line][0] && (
            <Stack spacing="2.5">
              <motion.div layout>
                <Tag size="lg" colorScheme="red">
                  {`${t('To')} ${t(lines[line].down)}`}
                </Tag>
              </motion.div>
              <motion.div layout="position">
                {down ? (
                  <TrainTable trainList={down} noTrain={down.length === 0} />
                ) : (
                  <Center h={24.5 + 33 * 4}>
                    <Spinner />
                  </Center>
                )}
              </motion.div>
            </Stack>
          )}
        </AnimateSharedLayout>
      </MotionConfig>
    </Stack>
  );
};
