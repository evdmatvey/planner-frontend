import clsx from 'clsx';
import { m } from 'framer-motion';
import { type ReactNode } from 'react';
import { Outlet } from 'react-router';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  sidebarSlot: ReactNode;
  profileSlot: ReactNode;
  useSidebarStore: () => { isCollapsed: boolean };
}

export const DashboardLayout = ({
  sidebarSlot,
  profileSlot,
  useSidebarStore,
}: DashboardLayoutProps) => {
  const { isCollapsed } = useSidebarStore();
  const getVw = () =>
    Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

  const classes = clsx(styles.content, {
    [styles.full]: isCollapsed,
  });

  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>{sidebarSlot}</div>
      <m.div
        className={classes}
        animate={{ width: getVw() - (isCollapsed ? 60 : 300) }}
      >
        <div className={styles.profile}>{profileSlot}</div>
        <div className={styles.page}>
          <Outlet />
        </div>
      </m.div>
    </div>
  );
};
