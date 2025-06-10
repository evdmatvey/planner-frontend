import clsx from 'clsx';
import { NavLink } from 'react-router';
import { linksConfig } from '@/shared/config/routes';
import styles from './NavigationMenu.module.css';

interface NavigationMenuProps {
  selectMenuItemHandler: () => void;
}

export const NavigationMenu = ({
  selectMenuItemHandler,
}: NavigationMenuProps) => {
  const getMenuLinkClasses = (isActive: boolean) =>
    clsx(styles.link, {
      [styles.active]: isActive,
    });

  return (
    <nav className={styles.root}>
      <ul>
        {linksConfig.map((link) => (
          <li key={link.to}>
            <NavLink
              className={({ isActive }) => getMenuLinkClasses(isActive)}
              onClick={() => selectMenuItemHandler()}
              to={link.to}
            >
              {link.icon}
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
