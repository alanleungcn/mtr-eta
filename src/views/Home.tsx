import * as React from 'react';
import { lines } from '../assets/lines';
import { Icon } from '../components/Icon';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { useSelected } from '../hooks/useSelected';
import { Option as IOption } from '../dataStructure';
import { CustomSelect } from '../components/CustomSelect';
import { LangSwitcher } from '../components/LangSwitcher';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';
import { motion, AnimateSharedLayout, MotionConfig } from 'framer-motion';
import {
  VStack,
  Button,
  HStack,
  useTheme,
  useColorMode,
} from '@chakra-ui/react';

export const Home = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { colorMode } = useColorMode();
  const [
    selectedLine,
    selectedStation,
    setLine,
    setStation,
    loading,
  ] = useSelected();
  const onSelectedLineChange = (e: IOption | null) => {
    if (selectedLine?.value === e?.value) return;
    setLine(e?.value);
    setStation(null);
  };
  const onSelectedStationChange = (e: IOption | null) => {
    setStation(e?.value);
  };
  const onReset = () => {
    setLine(null);
    setStation(null);
  };
  const viewEta = () => {
    history.push(`/eta/${selectedLine?.value}/${selectedStation?.value}`);
  };
  const theme = useTheme();
  return (
    <motion.div
      initial={{ x: '-100vw', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'spring',
        duration: 0.25,
      }}
      style={{
        maxWidth: 500,
        width: '100%',
        height: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {!loading && (
        <MotionConfig
          transition={{
            type: 'spring',
            duration: 0.5,
          }}
        >
          <AnimateSharedLayout>
            <VStack spacing="25" h="100%" justify="center">
              <Helmet>
                <title>MTR ETA</title>
                <meta
                  name="theme-color"
                  content={
                    colorMode === 'dark'
                      ? theme.colors.gray[800]
                      : theme.colors.whiteAlpha[900]
                  }
                />
              </Helmet>
              <motion.div layout style={{ width: '100%' }}>
                <VStack spacing="25">
                  <Icon />
                  <CustomSelect
                    selectedLine={selectedLine}
                    selectedStation={selectedStation}
                    onSelectedLineChange={onSelectedLineChange}
                    onSelectedStationChange={onSelectedStationChange}
                  />
                </VStack>
              </motion.div>
              <HStack spacing="25">
                <motion.div layout>
                  <HStack spacing="25">
                    <LangSwitcher
                      onLangChange={() => {
                        setLine(selectedLine?.value);
                        setStation(selectedStation?.value);
                      }}
                    />
                    <ColorModeSwitcher />
                  </HStack>
                </motion.div>
                {selectedLine && (
                  <motion.div
                    layout="position"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Button variant="outline" onClick={onReset}>
                      {t('Reset')}
                    </Button>
                  </motion.div>
                )}
                {selectedLine && selectedStation && (
                  <motion.div
                    layout="position"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Button
                      variant="outline"
                      onClick={viewEta}
                      disabled={!lines[selectedLine.value].eta}
                    >
                      {t('ETA')}
                    </Button>
                  </motion.div>
                )}
              </HStack>
              {selectedStation && (
                <motion.div
                  layout="position"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Footer code={selectedStation.value.toLowerCase()} />
                </motion.div>
              )}
            </VStack>
          </AnimateSharedLayout>
        </MotionConfig>
      )}
    </motion.div>
  );
};
