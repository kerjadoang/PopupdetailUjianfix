import {convertDate} from '@constants/functional';
import dayjs, {Dayjs} from 'dayjs';

export const calculateTimerLeft = (
  endTime: string | dayjs.ConfigType,
  startTime?: string | Dayjs,
) => {
  return convertDate(endTime).diff(
    convertDate(startTime) || convertDate(),
    'second',
  );
};
