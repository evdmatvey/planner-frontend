import clsx from 'clsx';
import { NavLink, NavLinkRenderProps } from 'react-router';
import styles from './NavigationTabs.module.css';

interface NavigationTabsProps {
  tabs: {
    title: string;
    route: string;
  }[];
}

export const NavigationTabs = ({ tabs }: NavigationTabsProps) => {
  const getLinkClasses = ({ isActive }: NavLinkRenderProps) =>
    clsx(styles.tab, {
      [styles.active]: isActive,
    });

  return (
    <nav className={styles.root}>
      <ul>
        {tabs.map((tab) => (
          <li key={tab.title}>
            <NavLink to={tab.route} className={getLinkClasses}>
              {tab.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
