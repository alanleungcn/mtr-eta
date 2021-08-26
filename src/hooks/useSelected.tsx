import { dict } from '../assets/dict';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Option {
	value: string;
	label: string;
}

const getLocalStorage = (key: string): string | null => {
	const item = localStorage.getItem(key);
	for (const key in dict) if (item === key) return item;
	localStorage.setItem(key, '');
	return null;
};

export const useSelected = (): [
	Option | null,
	Option | null,
	(line: string | null | undefined) => void,
	(station: string | null | undefined) => void
] => {
	const { t } = useTranslation();
	const [selectedLine, setSelectedLine] = useState<Option | null>(null);
	const [selectedStation, setSelectedStation] = useState<Option | null>(null);
	useEffect(() => {
		const line = getLocalStorage('selectedLine');
		const station = getLocalStorage('selectedStation');
		setLine(line);
		setStation(station);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		localStorage.setItem('selectedLine', selectedLine?.value ?? '');
	}, [selectedLine]);
	useEffect(() => {
		localStorage.setItem('selectedStation', selectedStation?.value ?? '');
	}, [selectedStation]);
	const setLine = (line: string | null | undefined): void => {
		setSelectedLine(line ? { value: line, label: t(line) } : null);
	};
	const setStation = (station: string | null | undefined): void => {
		setSelectedStation(station ? { value: station, label: t(station) } : null);
	};
	return [selectedLine, selectedStation, setLine, setStation];
};
