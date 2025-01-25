import { AnimatePresence, m } from 'framer-motion';
import { Link } from 'react-router';
import { routesConfig } from '@/shared/config/routes';
import { Button } from '@/shared/ui/Button';
import { useLogout } from '../../model/useLogout';
import styles from './ProfilePopup.module.css';

interface ProfilePopupProps {
  isOpen: boolean;
}

export const ProfilePopup = ({ isOpen }: ProfilePopupProps) => {
  const { mutate } = useLogout();

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          className={styles.root}
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: -20, opacity: 0 }}
          exit={{ y: -20, opacity: 0 }}
        >
          <Link to={routesConfig.DASHBOARD} className={styles.link}>
            Личный кабинет
          </Link>
          <Button
            color="secondary"
            variant="bordered"
            size="small"
            onClick={() => mutate()}
          >
            Выйти
          </Button>
        </m.div>
      )}
    </AnimatePresence>
  );
};
