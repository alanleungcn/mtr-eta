import axios from 'axios';
import * as React from 'react';
import { useEtaTime } from './useEtaTime';
import { TrainList, Error } from '../dataStructure';

export const useTrain = (
  line: string,
  sta: string
): [TrainList | undefined, TrainList | undefined, Error | undefined] => {
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const [rawUp, setRawUp] = React.useState<TrainList | undefined>(undefined);
  const [rawDown, setRawDown] = React.useState<TrainList | undefined>(
    undefined
  );
  const [loading, setLoading] = React.useState<boolean>(true);
  const [up, down] = useEtaTime(rawUp, rawDown, loading);
  React.useEffect(() => {
    const getTrain = async () => {
      axios
        .get(
          `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${line}&sta=${sta}`
        )
        .then((res) => {
          setRawUp(res.data.data[`${line}-${sta}`].UP);
          setRawDown(res.data.data[`${line}-${sta}`].DOWN);
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
  }, [line, sta]);
  return [up, down, error];
};
