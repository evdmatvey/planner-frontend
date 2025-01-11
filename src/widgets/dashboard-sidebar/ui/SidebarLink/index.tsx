import clsx from 'clsx';
import { AnimatePresence, m } from 'framer-motion';
import { type ReactNode } from 'react';
import { NavLink, NavLinkRenderProps } from 'react-router';
import { useDashboardSidebarStore } from '../../model/store';
import styles from './SidebarLink.module.css';

interface SidebarLinkProps {
  icon: ReactNode;
  children: ReactNode;
  to: string;
}

export const SidebarLink = ({ children, icon, to }: SidebarLinkProps) => {
  const { isCollapsed } = useDashboardSidebarStore();

  const getLinkClasses = ({ isActive }: NavLinkRenderProps) => {
    return clsx(styles.root, {
      [styles.active]: isActive,
    });
  };
  return (
    <NavLink className={getLinkClasses} to={to}>
      {icon}
      <AnimatePresence>
        {!isCollapsed && (
          <m.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {children}
          </m.div>
        )}
      </AnimatePresence>
    </NavLink>
  );
};
