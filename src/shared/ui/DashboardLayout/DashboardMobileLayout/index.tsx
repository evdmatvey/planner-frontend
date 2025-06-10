import { type ReactNode } from 'react';
import { Outlet } from 'react-router';
import { Logo } from '../../Logo';
import styles from './DashBoardMobileLayout.module.css';

interface DashBoardMobileLayoutProps {
  drawerSlot: ReactNode;
}

export const DashboardMobileLayout = ({
  drawerSlot,
}: DashBoardMobileLayoutProps) => {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Logo />
        {drawerSlot}
      </header>
      <div className={styles.wrapper}>
        <Outlet />
      </div>
    </div>
  );
};
