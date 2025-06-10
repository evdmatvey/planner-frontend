import { linksConfig } from '@/shared/config/routes';
import { SidebarLink } from '../SidebarLink';
import styles from './SidebarMenu.module.css';

export const SidebarMenu = () => {
  return (
    <nav>
      <ul className={styles.root}>
        {linksConfig.map((link) => (
          <SidebarLink
            key={link.to}
            children={link.text}
            icon={link.icon}
            to={link.to}
          />
        ))}
      </ul>
    </nav>
  );
};
