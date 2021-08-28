interface DirMap {
	[name: string]: {
		up: string;
		down: string;
		color: string;
	};
}

export const dir: DirMap = {
	AEL: {
		up: 'Airport / AsiaWorld-Expo',
		down: 'HOK',
		color: '#1c7670',
	},
	TCL: {
		up: 'TUC',
		down: 'HOK',
		color: '#fe7f1d',
	},
	TML: {
		up: 'TUM',
		down: 'WKS',
		color: '#9a3b26',
	},
	TKL: {
		up: 'Po Lam / LOHAS Park',
		down: 'NOP',
		color: '#6b208b',
	},
};
