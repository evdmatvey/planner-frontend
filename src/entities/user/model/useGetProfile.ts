import { useQuery } from '@tanstack/react-query';
import { userQueries } from '../api/user.queries';

export const useGetProfile = () => {
  const { data, isLoading, isError, error } = useQuery(userQueries.profile());

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
