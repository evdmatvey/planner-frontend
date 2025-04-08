import { type ReactNode } from 'react';
import { Outlet } from 'react-router';
import styles from './DashBoardMobileLayout.module.css';

interface DashBoardMobileLayoutProps {
  drawerSlot: ReactNode;
}

export const DashboardMobileLayout = ({
  drawerSlot,
}: DashBoardMobileLayoutProps) => {
  return (
    <div className={styles.wrapper}>
      {drawerSlot}
      <Outlet />
    </div>
  );
};
