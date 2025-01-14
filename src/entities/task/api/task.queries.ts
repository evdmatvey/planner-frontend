import { queryOptions } from '@tanstack/react-query';
import { taskService } from './task.service';

export const taskQueries = {
  all: () => ['tasks'],

  lists: () => [...taskQueries.all(), 'list'],
  list: () =>
    queryOptions({
      queryKey: [...taskQueries.lists()],
      queryFn: () => taskService.getAll(),
    }),

  details: () => [...taskQueries.all(), 'detail'],
  detail: (id: string) =>
    queryOptions({
      queryKey: [...taskQueries.details()],
      queryFn: () => taskService.getOne(id),
    }),
};
