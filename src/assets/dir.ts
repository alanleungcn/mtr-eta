interface DirMap {
	[name: string]: {
		up: string;
		down: string;
	};
}

export const dir: DirMap = {
	AEL: {
		up: 'Airport / AsiaWorld-Expo',
		down: 'Hong Kong',
	},
	TCL: {
		up: 'Tung Chung',
		down: 'Hong Kong',
	},
	TML: {
		up: 'Tuen Mun',
		down: 'Wu Kai Sha',
	},
	TKL: {
		up: 'Po Lam / LOHAS Park',
		down: 'North Point',
	},
};
