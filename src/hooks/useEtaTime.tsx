import { TrainList } from '../dataStructure';
import { useTranslation } from 'react-i18next';
import { useEffect, useCallback, useState } from 'react';

export const useEtaTime = (
  up: TrainList | undefined,
  down: TrainList | undefined,
  loading: boolean
): [TrainList | undefined, TrainList | undefined] => {
  const { t } = useTranslation();
  const [upList, setUpList] = useState<TrainList>();
  const [downList, setDownList] = useState<TrainList>();
  const setTime = useCallback(
    (train: TrainList): TrainList => {
      const tmp: TrainList = [];
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
