import { dict } from '../assets/dict';

export const codeToName = (code: string): string => {
	for (const key in dict) {
		if (code === key) {
			return dict[key];
		}
	}
	return 'not found';
};
