import { i18n } from 'i18next';
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { stations } from '../assets/stations';

interface Option {
  value: string;
  label: string;
}

const getLocalStorage = (key: string, i18next: i18n): string | null => {
  const item = localStorage.getItem(key);
  if (item && i18next.exists(item)) return item;
  localStorage.setItem(key, '');
  return null;
};

export const useSelected = (): [
  Option | null,
  Option | null,
  (line: string | null | undefined) => void,
  (station: string | null | undefined) => void,
  boolean
] => {
  const { t, i18n } = useTranslation();
  const [selectedLine, setSelectedLine] = useState<Option | null>(null);
  const [selectedStation, setSelectedStation] = useState<Option | null>(null);
  const [loading, setLoading] = useState(true);
  const setLine = useCallback(
    (line: string | null | undefined): void => {
      setSelectedLine(line ? { value: line, label: t(line) } : null);
    },
    [t]
  );
  const setStation = useCallback(
    (station: string | null | undefined): void => {
      setSelectedStation(
        station ? { value: station, label: t(station) } : null
      );
    },
    [t]
  );
  useEffect(() => {
    const line = getLocalStorage('selectedLine', i18n);
    const station = getLocalStorage('selectedStation', i18n);
    setLine(line);
    line && station && stations[line].includes(station)
      ? setStation(station)
      : setStation(null);
    setLoading(false);
  }, [i18n, setLine, setStation]);
  useEffect(() => {
    localStorage.setItem('selectedLine', selectedLine?.value ?? '');
  }, [selectedLine]);
  useEffect(() => {
    localStorage.setItem('selectedStation', selectedStation?.value ?? '');
  }, [selectedStation]);
  return [selectedLine, selectedStation, setLine, setStation, loading];
};
