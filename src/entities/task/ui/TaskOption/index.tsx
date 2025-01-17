import { type ReactNode } from 'react';
import styles from './TaskOption.module.css';

interface TaskOptionProps {
  children: ReactNode;
  onClick: () => void;
}

export const TaskOption = ({ children, onClick }: TaskOptionProps) => {
  return (
    <div className={styles.root} onClick={onClick}>
      {children}
    </div>
  );
};
