import { type ReactNode } from 'react';
import { Outlet } from 'react-router';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  sidebarSlot: ReactNode;
  profileSlot: ReactNode;
}

export const DashboardLayout = ({
  sidebarSlot,
  profileSlot,
}: DashboardLayoutProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>{sidebarSlot}</div>
      <div className={styles.content}>
        <div className={styles.profile}>{profileSlot}</div>
        <div className={styles.page}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
