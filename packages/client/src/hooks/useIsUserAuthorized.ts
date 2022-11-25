import { useGetUserQuery } from '../services/redux/queries/user.api';

export const useIsUserAuthorized = () => {
  const { data, error, isLoading } = useGetUserQuery();

  return { isUserAuthorized: !!data?.id && !error && !isLoading };
};
