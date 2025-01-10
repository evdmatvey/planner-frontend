import clsx from 'clsx';
import { type ReactNode } from 'react';
import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  children?: ReactNode;
  className?: string;
}

export const AuthLayoutTitle = ({ children, className }: AuthLayoutProps) => {
  const classes = clsx(styles.title, className);

  return <h1 className={classes}>{children}</h1>;
};
