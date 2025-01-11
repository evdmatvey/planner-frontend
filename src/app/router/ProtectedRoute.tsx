import { type ReactNode } from 'react';
import { Navigate } from 'react-router';
import { routesConfig } from '@/shared/config/routes';
import { AccessTokenStorage } from '@/shared/lib/requester';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isTokenExist = AccessTokenStorage.getToken();

  if (!isTokenExist) return <Navigate to={routesConfig.LOGIN} />;

  return children;
};
