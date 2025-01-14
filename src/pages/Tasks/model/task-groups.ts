export type TaskGroupValue =
  | 'today'
  | 'tomorrow'
  | 'on-this-week'
  | 'later'
  | 'completed';

export interface TaskGroup {
  readonly label: string;
  readonly value: TaskGroupValue;
}

export const taskGroups: TaskGroup[] = [
  {
    label: 'Сегодня',
    value: 'today',
  },
  {
    label: 'Завтра',
    value: 'tomorrow',
  },
  {
    label: 'На этой неделе',
    value: 'on-this-week',
  },
  {
    label: 'Позже',
    value: 'later',
  },
  {
    label: 'Выполнено',
    value: 'completed',
  },
] as const;
