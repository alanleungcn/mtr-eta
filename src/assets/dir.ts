interface DirMap {
	[name: string]: {
		up: string;
		down: string;
	};
}

export const dir: DirMap = {
	AEL: {
		up: 'Airport / AsiaWorld-Expo',
		down: 'HOK',
	},
	TCL: {
		up: 'TUC',
		down: 'HOK',
	},
	TML: {
		up: 'TUM',
		down: 'WKS',
	},
	TKL: {
		up: 'Po Lam / LOHAS Park',
		down: 'NOP',
	},
};
