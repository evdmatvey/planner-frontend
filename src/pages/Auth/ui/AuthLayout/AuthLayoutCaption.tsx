import { type ReactNode } from 'react';
import styles from './AuthLayout.module.css';

interface AuthLayoutCaptionProps {
  children: ReactNode;
}

export const AuthLayoutCaption = ({ children }: AuthLayoutCaptionProps) => {
  return <div className={styles.link}>{children}</div>;
};
