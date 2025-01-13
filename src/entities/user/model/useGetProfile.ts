import { useQuery } from '@tanstack/react-query';
import { userQueries } from '../api/user.queries';

export const useGetProfile = () => {
  const { data, error, isLoading, isError, isSuccess } = useQuery(
    userQueries.profile(),
  );

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};
