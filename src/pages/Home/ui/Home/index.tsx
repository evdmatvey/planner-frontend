import { Link } from 'react-router';
import { DashboardProfile } from '@/widgets/dashboard-profile';
import { routesConfig } from '@/shared/config/routes';
import { AccessTokenStorage } from '@/shared/lib/requester';
import { Logo } from '@/shared/ui/Logo';
import styles from './Home.module.css';

// TODO: Add landing page about planner

export const Home = () => {
  const isTokenExist = AccessTokenStorage.getToken();

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Logo />
        {isTokenExist ? (
          <DashboardProfile />
        ) : (
          <Link to={routesConfig.LOGIN} className={styles.link}>
            Войти
          </Link>
        )}
      </header>
    </div>
  );
};
