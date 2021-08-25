import { lines } from '../assets/lines';
import { codeToName } from './codeToName';

interface Option {
	value: string;
	label: string;
}

export const getStationsOpt = (line: string | undefined): Option[] => {
	if (!line) return [];
	const options: Option[] = [];
	lines[line].forEach((e) => {
		options.push({ value: e, label: codeToName(e) });
	});
	return options;
};
