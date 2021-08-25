import axios from 'axios';
import * as React from 'react';

interface Train {
	seq: string;
	dest: string;
	plat: string;
	time: string;
}

interface Error {
	isdelay: boolean;
	message: string;
}

export const useTrain = (
	line: string,
	sta: string
): [Train[] | undefined, Train[] | undefined, Error | undefined, boolean] => {
	const [up, setUp] = React.useState<Train[] | undefined>(undefined);
	const [down, setDown] = React.useState<Train[] | undefined>(undefined);
	const [error, setError] = React.useState<Error | undefined>(undefined);
	const [loading, setLoading] = React.useState<boolean>(true);
	React.useEffect(() => {
		const getTrain = async () => {
			//setError(undefined);
			axios
				.get(
					`https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${line}&sta=${sta}`
				)
				.then((res) => {
					setUp(res.data.data[`${line}-${sta}`].UP);
					setDown(res.data.data[`${line}-${sta}`].DOWN);
					if (!res.data.status || res.data.isdelay === 'Y')
						setError({
							isdelay: res.data.isdelay === 'Y' ? true : false,
							message: res.data.message,
						});
					else setError(undefined);
				})
				.catch((err) => {
					console.log(err);
					setError({ isdelay: false, message: 'Request error' });
				})
				.finally(() => {
					setLoading(false);
				});
		};
		getTrain();
		const interval = setInterval(getTrain, 10000);
		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return [up, down, error, loading];
};
