import { stations } from '../assets/stations';
import { OptionList } from '../dataStructure';
import { useTranslation } from 'react-i18next';

export const useLinesOpt = (): OptionList => {
  const { t } = useTranslation();
  const options: OptionList = [];
  for (const line in stations) options.push({ value: line, label: t(line) });
  return options;
};
