import type {
  TasksAnalytics,
  TasksInfo,
  TasksInfoByGroups,
} from '@/entities/analytics';

export const reduceTasksInfoByGroup = (
  tasksAnalytics: TasksAnalytics[],
  key: keyof TasksInfoByGroups,
): TasksInfo => {
  return tasksAnalytics.reduce(
    (acc, ta) => {
      acc.count += ta.tasks[key].count;
      acc.executionTime += ta.tasks[key].executionTime;

      return acc;
    },
    {
      count: 0,
      executionTime: 0,
    },
  );
};
