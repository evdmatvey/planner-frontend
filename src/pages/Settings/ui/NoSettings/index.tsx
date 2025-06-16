import { Navigate } from 'react-router';
import { routesConfig } from '@/shared/config/routes';

export const NoSettings = () => {
  return <Navigate to={routesConfig.SETTINGS_PROFILE} />;
};
