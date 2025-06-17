import { Link } from 'react-router';
import { DashboardDrawer } from '@/widgets/dashboard-drawer';
import { DashboardProfile } from '@/widgets/dashboard-profile';
import { brakepointsConfig } from '@/shared/config/brakepoints';
import { routesConfig } from '@/shared/config/routes';
import { getVw } from '@/shared/lib/get-vw';
import { AccessTokenStorage } from '@/shared/lib/requester';
import { Logo } from '@/shared/ui/Logo';
import styles from './Home.module.css';

// TODO: Add landing page about planner

export const Home = () => {
  const isTokenExist = AccessTokenStorage.getToken();
  const isMobile = getVw() < brakepointsConfig.mobile;

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Logo />
        {isTokenExist ? (
          isMobile ? (
            <DashboardDrawer />
          ) : (
            <DashboardProfile />
          )
        ) : (
          <Link to={routesConfig.LOGIN} className={styles.link}>
            Войти
          </Link>
        )}
      </header>
      <div className="container">Приложение для планирования Planner</div>
    </div>
  );
};
