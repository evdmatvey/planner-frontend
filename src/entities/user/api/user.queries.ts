import { queryOptions } from '@tanstack/react-query';
import { userService } from './user.service';

export const userQueries = {
  all: () => ['users'],

  profiles: () => [...userQueries.all(), 'profile'],
  profile: () =>
    queryOptions({
      queryKey: [...userQueries.profiles()],
      queryFn: () => userService.getProfile(),
    }),
};
