import clsx from 'clsx';
import { ComponentProps } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './Input.module.css';

interface InputProps extends ComponentProps<'input'> {
  error?: string;
  register?: UseFormRegisterReturn;
}

export const Input = ({ error, register, className, ...props }: InputProps) => {
  const classes = clsx(styles.input, className, {
    [styles.inputError]: error,
  });

  return (
    <div className={styles.root}>
      <input className={classes} {...register} {...props} />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
