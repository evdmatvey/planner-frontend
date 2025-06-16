import { createBrowserRouter } from 'react-router';
import { Analytics } from '@/pages/Analytics';
import { Login } from '@/pages/Auth';
import { Register } from '@/pages/Auth';
import { Home } from '@/pages/Home';
import { NotFound } from '@/pages/NotFound';
import { SettingsLayout } from '@/pages/Settings';
import { NoSettings } from '@/pages/Settings/ui/NoSettings';
import { SettingsProfile } from '@/pages/Settings/ui/SettingsProfile';
import { SettingsTags } from '@/pages/Settings/ui/SettingsTags';
import { Tasks } from '@/pages/Tasks';
import { DashboardDrawer } from '@/widgets/dashboard-drawer';
import { DashboardProfile } from '@/widgets/dashboard-profile';
import { DashboardSidebar } from '@/widgets/dashboard-sidebar';
import { useDashboardSidebarStore } from '@/widgets/dashboard-sidebar';
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
          useSidebarStore={useDashboardSidebarStore}
          sidebarSlot={<DashboardSidebar />}
          profileSlot={<DashboardProfile />}
          drawerSlot={<DashboardDrawer />}
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
        element: <SettingsLayout />,
        children: [
          {
            index: true,
            element: <NoSettings />,
          },
          {
            path: routesConfig.SETTINGS_PROFILE,
            element: <SettingsProfile />,
          },
          {
            path: routesConfig.SETTINGS_TAGS,
            element: <SettingsTags />,
          },
        ],
      },
      {
        path: routesConfig.ANALYTICS,
        element: <Analytics />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
