import * as React from 'react';
import {
  Tag,
  Alert,
  AlertIcon,
  AlertTitle,
  IconButton,
  HStack,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import { lines } from '../assets/lines';
import { useTrain } from '../hooks/useTrain';
import { IoChevronBack } from 'react-icons/all';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { UpDown } from '../components/UpDown';

export interface Train {
  dest: string;
  plat: string;
  seq: string;
  time: string;
}

export const Eta = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { line, station } = useParams<{ line: string; station: string }>();
  const [up, down, error] = useTrain(line, station);
  return (
    <motion.div
      initial={{ x: '100vw', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', duration: 0.25 }}
      style={{
        maxWidth: 500,
        width: '100%',
        height: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <Helmet>
        <title>{`${t(line)} / ${t(station)}`}</title>
      </Helmet>
      <Flex h="100%" direction="column">
        <HStack mt="5" ml="2.5" spacing="2.5">
          <IconButton
            fontSize="20"
            variant="ghost"
            aria-label="back"
            icon={<IoChevronBack />}
            onClick={() => history.push('/')}
          />
          <Tag size="lg" color="white" backgroundColor={lines[line].color}>
            {`${t(line)} / ${t(station)}`}
          </Tag>
        </HStack>
        <Spacer />
        <UpDown up={up} down={down} line={line} station={station} />
        <Spacer />
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
