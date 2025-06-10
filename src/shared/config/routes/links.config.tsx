import { CalendarIcon } from '@/shared/ui/icons/CalendarIcon';
import { ChartIcon } from '@/shared/ui/icons/ChartIcon';
import { SettingsIcon } from '@/shared/ui/icons/SettingsIcon';
import { routesConfig } from './routes.config';

export const linksConfig = [
  {
    icon: <ChartIcon />,
    text: 'Аналитика',
    to: routesConfig.ANALYTICS,
  },
  {
    icon: <CalendarIcon />,
    text: 'Задачи',
    to: routesConfig.TASKS,
  },
  {
    icon: <SettingsIcon />,
    text: 'Настройки',
    to: routesConfig.SETTINGS,
  },
];
