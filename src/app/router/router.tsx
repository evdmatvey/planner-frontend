import { createBrowserRouter } from 'react-router';
import { Login } from '@/pages/Auth';
import { Register } from '@/pages/Auth';
import { Home } from '@/pages/Home';
import { NotFound } from '@/pages/NotFound';
import { Settings } from '@/pages/Settings';
import { Tasks } from '@/pages/Tasks';
import { DashboardProfile } from '@/widgets/dashboard-profile';
import { DashboardSidebar } from '@/widgets/dashboard-sidebar';
import { routesConfig } from '@/shared/config/routes';
import { DashboardLayout } from '@/shared/ui/DashboardLayout';
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
    path: routesConfig.DASHBOARD,
    element: (
      <ProtectedRoute>
        <DashboardLayout
          sidebarSlot={<DashboardSidebar />}
          profileSlot={<DashboardProfile />}
        />
      </ProtectedRoute>
    ),
    children: [
      {
        path: routesConfig.TASKS,
        element: <Tasks />,
      },
      {
        path: routesConfig.SETTINGS,
        element: <Settings />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
