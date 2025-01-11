import { type ReactNode } from 'react';
import { Outlet } from 'react-router';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  sidebarSlot: ReactNode;
}

export const DashboardLayout = ({ sidebarSlot }: DashboardLayoutProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>{sidebarSlot}</div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
