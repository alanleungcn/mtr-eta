import { stations } from '../assets/stations';
import { OptionList } from '../dataStructure';
import { useTranslation } from 'react-i18next';

export const useStationsOpt = (line: string | undefined): OptionList => {
  const { t } = useTranslation();
  if (!line) return [];
  const options: OptionList = [];
  stations[line].forEach((e) => {
    options.push({ value: e, label: t(e) });
  });
  return options;
};
