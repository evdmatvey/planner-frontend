import { createBrowserRouter } from 'react-router';
import { Login } from '@/pages/Auth';
import { Register } from '@/pages/Auth';
import { Home } from '@/pages/Home';
import { Tasks } from '@/pages/Tasks';
import { routesConfig } from '@/shared/config/routes';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';

export const router = createBrowserRouter([
  {
    path: routesConfig.HOME,
    element: <Home />,
  },
  {
    path: routesConfig.LOGIN,
    element: (
      <PublicOnlyRoute>
        <Login />
      </PublicOnlyRoute>
    ),
  },
  {
    path: routesConfig.REGISTER,
    element: (
      <PublicOnlyRoute>
        <Register />
      </PublicOnlyRoute>
    ),
  },
  {
    path: routesConfig.TASKS,
    element: (
      <ProtectedRoute>
        <Tasks />
      </ProtectedRoute>
    ),
  },
]);
