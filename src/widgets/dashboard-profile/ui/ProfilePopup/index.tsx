import { AnimatePresence, m } from 'framer-motion';
import { Link } from 'react-router';
import { LogoutUser } from '@/features/logout-user';
import { routesConfig } from '@/shared/config/routes';
import styles from './ProfilePopup.module.css';

interface ProfilePopupProps {
  isOpen: boolean;
  closePopupHandler: () => void;
}

export const ProfilePopup = ({
  isOpen,
  closePopupHandler,
}: ProfilePopupProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          className={styles.root}
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: -20, opacity: 0 }}
          exit={{ y: -20, opacity: 0 }}
        >
          <Link
            to={routesConfig.DASHBOARD}
            className={styles.link}
            onClick={closePopupHandler}
          >
            Личный кабинет
          </Link>
          <LogoutUser size="small" onLogout={closePopupHandler} />
        </m.div>
      )}
    </AnimatePresence>
  );
};
