import { type ReactNode } from 'react';
import styles from './AuthLayout.module.css';
import { AuthLayoutCaption } from './AuthLayoutCaption';
import { AuthLayoutForm } from './AuthLayoutForm';
import { AuthLayoutTitle } from './AuthLayoutTitle';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

AuthLayout.Title = AuthLayoutTitle;
AuthLayout.Form = AuthLayoutForm;
AuthLayout.Caption = AuthLayoutCaption;
