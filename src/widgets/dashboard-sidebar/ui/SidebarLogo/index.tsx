import clsx from 'clsx';
import { m } from 'framer-motion';
import { useDashboardSidebarStore } from '../../model/store';
import styles from './SidebarLogo.module.css';

export const SidebarLogo = () => {
  const { isCollapsed } = useDashboardSidebarStore();
  const classes = clsx(styles.root, {
    [styles.collapsed]: isCollapsed,
  });

  return (
    <div className={classes}>
      <m.img
        src="/logo.svg"
        alt="Planner"
        animate={{ width: isCollapsed ? 40 : 50 }}
      />
      {!isCollapsed && 'Planner'}
    </div>
  );
};
