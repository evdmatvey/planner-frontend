import dayjs, { type Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { Task } from '@/entities/task';
import { TaskGroupValue } from '../model/task-groups';

dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const referenceDateForValue: Omit<
  Record<TaskGroupValue, Dayjs>,
  'completed'
> = {
  today: dayjs().startOf('date'),
  tomorrow: dayjs().add(1, 'day').startOf('day'),
  'on-this-week': dayjs().endOf('isoWeek'),
  later: dayjs().add(1, 'week').startOf('day'),
};

const isToday = (createdAt: string) =>
  dayjs(createdAt).isSame(referenceDateForValue.today, 'day');

const isTomorrow = (createdAt: string) =>
  dayjs(createdAt).isSame(referenceDateForValue.tomorrow, 'day');

const isOnThisWeek = (createdAt: string) =>
  dayjs(createdAt).isSameOrBefore(referenceDateForValue['on-this-week']);

const isLater = (createdAt: string) =>
  dayjs(createdAt).isSameOrAfter(referenceDateForValue.later);

const filterCallbackForGroup: Record<TaskGroupValue, (task: Task) => boolean> =
  {
    completed: (task) => task.isCompleted,
    today: (task) => isToday(task.createdAt) && !task.isCompleted,
    tomorrow: (task) => isTomorrow(task.createdAt) && !task.isCompleted,
    'on-this-week': (task) =>
      isOnThisWeek(task.createdAt) &&
      !isToday(task.createdAt) &&
      !isTomorrow(task.createdAt) &&
      !task.isCompleted,
    later: (task) => isLater(task.createdAt) && !task.isCompleted,
  };

export const filterTasksByGroup = (tasks: Task[], value: TaskGroupValue) =>
  tasks.filter(filterCallbackForGroup[value]);
