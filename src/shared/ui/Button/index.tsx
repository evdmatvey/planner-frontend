import clsx from 'clsx';
import { ComponentProps } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ComponentProps<'button'> {
  color?: 'primary' | 'secondary';
  size?: 'small' | 'medium';
  variant?: 'solid' | 'bordered';
}

export const Button = ({
  color = 'primary',
  size = 'medium',
  variant = 'solid',
  className,
  children,
  ...props
}: ButtonProps) => {
  const classes = clsx(
    styles.root,
    styles[color],
    styles[size],
    styles[variant],
    className,
  );

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
