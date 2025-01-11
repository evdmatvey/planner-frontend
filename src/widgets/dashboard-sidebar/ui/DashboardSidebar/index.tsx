import clsx from 'clsx';
import { m } from 'framer-motion';
import { useDashboardSidebarStore } from '../../model/store.ts';
import { Divider } from '../Divider/index.tsx';
import { SidebarLogo } from '../SidebarLogo/index.tsx';
import { SidebarMenu } from '../SidebarMenu/index.tsx';
import { ToggleCollapseButton } from '../ToggleCollapseButton.tsx';
import styles from './DashboardSidebar.module.css';

export const DashboardSidebar = () => {
  const { isCollapsed } = useDashboardSidebarStore();
  const classes = clsx(styles.root, {
    [styles.collapsed]: isCollapsed,
  });

  return (
    <m.aside
      className={classes}
      animate={{
        width: isCollapsed ? 60 : 300,
        padding: isCollapsed ? 10 : 20,
        paddingTop: isCollapsed ? 30 : 20,
        transition: {
          type: 'spring',
          damping: 20,
          stiffness: 200,
        },
      }}
    >
      <ToggleCollapseButton />
      <SidebarLogo />
      <Divider />
      <SidebarMenu />
      <Divider />
    </m.aside>
  );
};
