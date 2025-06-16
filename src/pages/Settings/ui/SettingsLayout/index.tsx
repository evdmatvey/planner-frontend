import { Outlet } from 'react-router';
import { routesConfig } from '@/shared/config/routes';
import { NavigationTabs } from '@/shared/ui/NavigationTabs';
import styles from './Settings.module.css';

export const SettingsLayout = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Настройки</h1>
      <div className={styles.tabs}>
        <NavigationTabs
          tabs={[
            {
              title: 'Настройки профиля',
              route: routesConfig.SETTINGS_PROFILE,
            },
            { title: 'Управление тегами', route: routesConfig.SETTINGS_TAGS },
          ]}
        />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
