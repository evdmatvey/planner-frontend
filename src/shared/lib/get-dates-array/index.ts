import { type Dayjs } from 'dayjs';

export const getDatesArray = (start: Dayjs, end: Dayjs): Dayjs[] => {
  const arr = [];

  while (start.isSameOrBefore(end)) {
    arr.push(start);
    start = start.add(1, 'day');
  }

  return arr;
};
