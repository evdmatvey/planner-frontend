import { AnimatePresence, m } from 'framer-motion';
import { Link } from 'react-router';
import { routesConfig } from '@/shared/config/routes';
import { Button } from '@/shared/ui/Button';
import { useLogout } from '../../model/useLogout';
import styles from './ProfilePopup.module.css';

interface ProfilePopupProps {
  isOpen: boolean;
  closePopupHandler: () => void;
}

export const ProfilePopup = ({
  isOpen,
  closePopupHandler,
}: ProfilePopupProps) => {
  const { mutate: logout } = useLogout();

  const logoutHandler = () => {
    logout();
    closePopupHandler();
  };

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
          <Button
            color="secondary"
            variant="bordered"
            size="small"
            onClick={logoutHandler}
          >
            Выйти
          </Button>
        </m.div>
      )}
    </AnimatePresence>
  );
};
