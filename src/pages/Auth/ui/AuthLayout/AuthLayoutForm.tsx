import { type ComponentProps } from 'react';
import styles from './AuthLayout.module.css';

type AuthLayoutFormProps = ComponentProps<'form'>;

export const AuthLayoutForm = ({ children, ...props }: AuthLayoutFormProps) => {
  return (
    <form className={styles.form} {...props}>
      {children}
    </form>
  );
};
