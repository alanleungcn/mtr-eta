import { useTranslation } from 'react-i18next';
import { stations } from '../assets/stations';

interface Option {
  value: string;
  label: string;
}

export const useStationsOpt = (line: string | undefined): Option[] => {
  const { t } = useTranslation();
  if (!line) return [];
  const options: Option[] = [];
  stations[line].forEach((e) => {
    options.push({ value: e, label: t(e) });
  });
  return options;
};
