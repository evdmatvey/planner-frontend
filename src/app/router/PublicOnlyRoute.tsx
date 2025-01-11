import { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { routesConfig } from '@/shared/config/routes';
import { AccessTokenStorage } from '@/shared/lib/requester';

interface PublicOnlyRouteProps {
  children: ReactNode;
}

export const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {
  const isTokenExist = AccessTokenStorage.getToken();

  if (isTokenExist) return <Navigate to={routesConfig.TASKS} />;

  return children;
};
