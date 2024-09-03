import {convertDate} from '@constants/functional';

const parseDateTime = (timeStart?: Date, timeEnd?: Date): string => {
  let result = convertDate(timeStart).format('dddd, MMMM D YYYY • HH:mm - ');
  result += convertDate(timeEnd).format('HH:mm');
  return result;
};
const localeDate = (date: Date | string): Date => {
  return convertDate(date).locale('id').toDate();
};

export {parseDateTime, localeDate};
