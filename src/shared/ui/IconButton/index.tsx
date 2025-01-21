import clsx from 'clsx';
import { type ComponentProps, type ReactNode } from 'react';
import styles from './IconButton.module.css';

interface IconButtonProps extends ComponentProps<'button'> {
  icon: ReactNode;
}

export const IconButton = ({ icon, className, ...props }: IconButtonProps) => {
  const classes = clsx(styles.root, className);

  return (
    <button className={classes} {...props}>
      {icon}
    </button>
  );
};
