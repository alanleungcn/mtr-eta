import React from 'react';
import { lines } from '../assets/lines';
import { useTranslation } from 'react-i18next';
import Select, { components } from 'react-select';
import { useLinesOpt } from '../hooks/useLinesOpt';
import { Option as IOption } from '../dataStructure';
import { useStationsOpt } from '../hooks/useStationsOpt';
import { Badge, useColorModeValue, useTheme, VStack } from '@chakra-ui/react';

const customWidth = {
  container: (base: any) => ({
    ...base,
    width: '75%',
  }),
};

const lineColor = {
  option: (base: any, state: any) => ({
    ...base,
    display: 'flex',
    overflow: 'visible',
    alignItems: 'center',
    ':before': {
      width: 25,
      height: 12.5,
      content: '""',
      marginRight: 10,
      borderRadius: 6.25,
      display: 'inline-block',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
      backgroundColor: lines[state.data.value].color,
    },
  }),
  singleValue: (base: any, state: any) => ({
    ...base,
    display: 'flex',
    overflow: 'visible',
    alignItems: 'center',
    ':before': {
      width: 25,
      height: 12.5,
      content: '""',
      marginRight: 10,
      borderRadius: 6.25,
      display: 'inline-block',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
      backgroundColor: lines[state.data.value].color,
    },
  }),
};

const Option = (props: any) => {
  const { t } = useTranslation();
  return (
    <components.Option {...props}>
      {props.label}
      {lines[props.value].eta && (
        <Badge colorScheme="red" variant="solid" ml="auto">
          {t('ETA')}
        </Badge>
      )}
    </components.Option>
  );
};

const NoOptionsMessage = (props: any) => {
  const { t } = useTranslation();
  return (
    <components.NoOptionsMessage {...props}>
      <span>{t('No options')}</span>
    </components.NoOptionsMessage>
  );
};

interface Props {
  selectedLine: IOption | null;
  selectedStation: IOption | null;
  onSelectedLineChange: (e: IOption | null) => void;
  onSelectedStationChange: (e: IOption | null) => void;
}

export const CustomSelect = ({
  selectedLine,
  selectedStation,
  onSelectedLineChange,
  onSelectedStationChange,
}: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const linesOpt = useLinesOpt();
  const stationsOpt = useStationsOpt(selectedLine?.value);
  const selectColor = {
    primary: theme.colors.blue[400], // selected
    primary25: theme.colors.whiteAlpha[200], // hover
    primary50: theme.colors.whiteAlpha[400], // active
    neutral0: theme.colors.gray[800], // background
    neutral20: theme.colors.whiteAlpha[300], // border
    neutral80: theme.colors.whiteAlpha[900], // text
  };
  const selectTheme = useColorModeValue(undefined, (theme: any) => ({
    ...theme,
    colors: {
      ...theme.colors,
      ...selectColor,
    },
  }));
  return (
    <VStack spacing="25" w="100%">
      <Select
        options={linesOpt}
        value={selectedLine}
        isSearchable={false}
        placeholder={t('Select line...')}
        onChange={onSelectedLineChange}
        components={{ Option, NoOptionsMessage }}
        styles={{ ...lineColor, ...customWidth }}
        theme={selectTheme}
      />
      <Select
        styles={customWidth}
        options={stationsOpt}
        isSearchable={false}
        value={selectedStation}
        placeholder={t('Select station...')}
        onChange={onSelectedStationChange}
        components={{ NoOptionsMessage }}
        theme={selectTheme}
      />
    </VStack>
  );
};
