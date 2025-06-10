import clsx from 'clsx';
import { m } from 'framer-motion';
import { type ReactNode } from 'react';
import { Outlet } from 'react-router';
import { brakepointsConfig } from '@/shared/config/brakepoints';
import { getVw } from '@/shared/lib/get-vw';
import { DashboardMobileLayout } from '../DashboardMobileLayout';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  sidebarSlot: ReactNode;
  profileSlot: ReactNode;
  drawerSlot: ReactNode;
  useSidebarStore: () => { isCollapsed: boolean };
}

export const DashboardLayout = ({
  sidebarSlot,
  profileSlot,
  drawerSlot,
  useSidebarStore,
}: DashboardLayoutProps) => {
  const { isCollapsed } = useSidebarStore();

  const classes = clsx(styles.content, {
    [styles.full]: isCollapsed,
  });

  return (
    <>
      {getVw() >= brakepointsConfig.mobile ? (
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
      ) : (
        <DashboardMobileLayout drawerSlot={drawerSlot} />
      )}
    </>
  );
};
