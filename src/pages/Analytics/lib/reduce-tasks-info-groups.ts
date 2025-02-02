import type { TasksAnalytics, TasksInfoByGroups } from '@/entities/analytics';
import { reduceTasksInfoByGroup } from './reduce-tasks-info-by-group';

export const reduceTasksInfoGroups = (
  tasksAnalytics: TasksAnalytics[],
): TasksInfoByGroups => ({
  all: reduceTasksInfoByGroup(tasksAnalytics, 'all'),
  completed: reduceTasksInfoByGroup(tasksAnalytics, 'completed'),
  todo: reduceTasksInfoByGroup(tasksAnalytics, 'todo'),
});
