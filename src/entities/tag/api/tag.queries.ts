import { queryOptions } from '@tanstack/react-query';
import { tagService } from './tag.service';

export const tagQueries = {
  all: () => ['tags'],

  lists: () => [...tagQueries.all(), 'list'],
  list: () =>
    queryOptions({
      queryKey: [...tagQueries.lists()],
      queryFn: () => tagService.getAll(),
    }),

  details: () => [...tagQueries.all(), 'detail'],
  detail: (id: string) =>
    queryOptions({
      queryKey: [...tagQueries.details()],
      queryFn: () => tagService.getOne(id),
    }),
};
