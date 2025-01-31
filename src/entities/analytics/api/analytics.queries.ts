import { queryOptions } from '@tanstack/react-query';
import { analyticsService } from './analytics.service';

export const analyticsQueries = {
  all: () => ['analytics'],

  tasks: () => [...analyticsQueries.all(), 'tasks'],
  task: () =>
    queryOptions({
      queryKey: [...analyticsQueries.tasks()],
      queryFn: () => analyticsService.getTasksAnalytics(),
    }),

  tags: () => [...analyticsQueries.all(), 'tags'],
  tag: () =>
    queryOptions({
      queryKey: [...analyticsQueries.tags()],
      queryFn: () => analyticsService.getTagsAnalytics(),
    }),
};
