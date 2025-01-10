import { createBrowserRouter } from 'react-router';
import { Login } from '@/pages/Auth';
import { Register } from '@/pages/Auth';
import { Home } from '@/pages/Home';
import { Tasks } from '@/pages/Tasks';
import { routesConfig } from '@/shared/config/routes';

export const router = createBrowserRouter([
  {
    path: routesConfig.HOME,
    element: <Home />,
  },
  {
    path: routesConfig.LOGIN,
    element: <Login />,
  },
  {
    path: routesConfig.REGISTER,
    element: <Register />,
  },
  {
    path: routesConfig.TASKS,
    element: <Tasks />,
  },
]);
