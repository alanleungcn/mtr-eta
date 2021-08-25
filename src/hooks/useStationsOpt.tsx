import { useTranslation } from 'react-i18next';
import { lines } from '../assets/lines';

interface Option {
	value: string;
	label: string;
}

export const useStationsOpt = (line: string | undefined): Option[] => {
	const { t } = useTranslation();
	if (!line) return [];
	const options: Option[] = [];
	lines[line].forEach((e) => {
		options.push({ value: e, label: t(e) });
	});
	return options;
};
