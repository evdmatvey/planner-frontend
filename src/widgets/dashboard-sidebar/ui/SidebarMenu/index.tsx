import { routesConfig } from '@/shared/config/routes';
import { CalendarIcon } from '@/shared/ui/icons/CalendarIcon';
import { ChartIcon } from '@/shared/ui/icons/ChartIcon';
import { SettingsIcon } from '@/shared/ui/icons/SettingsIcon';
import { SidebarLink } from '../SidebarLink';
import styles from './SidebarMenu.module.css';

const sidebarMenuLinks = [
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

export const SidebarMenu = () => {
  return (
    <nav>
      <ul className={styles.root}>
        {sidebarMenuLinks.map((link) => (
          <SidebarLink
            key={link.to}
            children={link.text}
            icon={link.icon}
            to={link.to}
          />
        ))}
      </ul>
    </nav>
  );
};
