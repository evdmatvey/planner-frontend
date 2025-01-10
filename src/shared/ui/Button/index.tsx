import clsx from 'clsx';
import { ComponentProps } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ComponentProps<'button'> {
  color?: 'primary';
}

export const Button = ({
  color = 'primary',
  className,
  children,
  ...props
}: ButtonProps) => {
  const classes = clsx(styles.root, styles[color], className);

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
