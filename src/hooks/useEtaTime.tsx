import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Train {
	dest: string;
	plat: string;
	seq: string;
	time: string;
}

export const useEtaTime = (
	up: Train[] | undefined,
	down: Train[] | undefined,
	loading: boolean
): [Train[] | undefined, Train[] | undefined] => {
	const { t } = useTranslation();
	const [upList, setUpList] = useState<Train[]>();
	const [downList, setDownList] = useState<Train[]>();
	const setTime = useCallback(
		(train: Train[]): Train[] => {
			const tmp: Train[] = [];
			for (let i = 0; i < train.length; i++) {
				const min =
					(+new Date(train[i].time.replace(/\s/, 'T')) - +new Date()) / 60000;
				tmp[i] = {
					...train[i],
					time:
						min <= 0
							? t('Departing')
							: min < 1
							? t('Arriving')
							: `${min.toFixed()} ${t('min')}`,
				};
			}
			return tmp;
		},
		[t]
	);
	const setTrainList = useCallback(() => {
		up && setUpList(setTime(up));
		down && setDownList(setTime(down));
	}, [up, down, setTime]);
	useEffect(() => {
		!loading && setTrainList();
	}, [loading, setTrainList]);
	useEffect(() => {
		const timeout = setTimeout(setTrainList, 1000);
		return () => clearTimeout(timeout);
	});
	return [upList, downList];
};
