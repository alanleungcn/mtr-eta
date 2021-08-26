import { lines } from '../assets/lines';
import { useTranslation } from 'react-i18next';

interface Option {
	value: string;
	label: string;
}

export const useLinesOpt = (): Option[] => {
	const { t } = useTranslation();
	const options: Option[] = [];
	for (const line in lines) options.push({ value: line, label: t(line) });
	return options;
};