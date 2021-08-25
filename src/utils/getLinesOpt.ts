import { lines } from '../assets/lines';
import { codeToName } from './codeToName';

interface Option {
	value: string;
	label: string;
}

export const getLinesOpt = (): Option[] => {
	const options: Option[] = [];
	for (const line in lines)
		options.push({ value: line, label: codeToName(line) });
	return options;
};
