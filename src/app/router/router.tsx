import { createBrowserRouter } from 'react-router';
import { Home } from '@/pages/Home';
import { routesConfig } from '@/shared/config/routes';

export const router = createBrowserRouter([
  {
    path: routesConfig.HOME,
    element: <Home />,
  },
]);
