import { AnimatePresence, m } from 'framer-motion';
import { ReactNode } from 'react';
import { IconButton } from '../IconButton';
import { CloseIcon } from '../icons/CloseIcon';
import styles from './Drawer.module.css';

interface DrawerProps {
  children: ReactNode;
  isOpen: boolean;
  closeDrawerHandler: () => void;
}

export const Drawer = ({
  children,
  isOpen,
  closeDrawerHandler,
}: DrawerProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          className={styles.drawer}
          animate={{ width: 320, opacity: 1 }}
          initial={{ width: 0, opacity: 0 }}
          exit={{ width: 0, opacity: 0 }}
        >
          <IconButton
            className={styles.close}
            icon={<CloseIcon />}
            onClick={closeDrawerHandler}
          />
          {children}
        </m.div>
      )}
    </AnimatePresence>
  );
};
