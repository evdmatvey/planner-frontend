import { m } from 'framer-motion';
import { type ReactNode } from 'react';
import { CloseIcon } from '@/shared/ui/icons/CloseIcon';
import styles from './TaskModal.module.css';

interface TaskModalProps {
  title: string;
  children: ReactNode;
  closeModalHandler: () => void;
}

export const TaskModal = ({
  title,
  children,
  closeModalHandler,
}: TaskModalProps) => {
  return (
    <m.div
      className={styles.root}
      initial={{ width: 200, opacity: 0 }}
      animate={{ width: 450, opacity: 1 }}
      exit={{ width: 200, opacity: 0 }}
    >
      <button className={styles.close} onClick={closeModalHandler}>
        <CloseIcon />
      </button>
      <h3 className={styles.title}>{title}</h3>
      {children}
    </m.div>
  );
};
