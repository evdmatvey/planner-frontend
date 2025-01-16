import clsx from 'clsx';
import { ComponentProps, forwardRef } from 'react';
import styles from './TransparentInput.module.css';

interface TransparentInputProps extends ComponentProps<'input'> {
  variant?: 'transparent' | 'underscore';
}

export const TransparentInput = forwardRef<
  HTMLInputElement,
  TransparentInputProps
>(({ variant = 'transparent', ...props }, ref) => {
  const classes = clsx(styles.input, styles[variant]);

  return <input className={classes} ref={ref} {...props} />;
});
