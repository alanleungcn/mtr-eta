export const getEtaText = (from: Date): string => {
	const ms = +from - +new Date();
	const min = ms / 60000;
	return min <= 0 ? 'Departing' : min < 1 ? 'Arriving' : `${min.toFixed(0)}min`;
};
