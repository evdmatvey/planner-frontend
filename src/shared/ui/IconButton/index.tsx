import clsx from 'clsx';
import { type ComponentProps, type ReactNode, forwardRef } from 'react';
import styles from './IconButton.module.css';

interface IconButtonProps extends ComponentProps<'button'> {
  icon: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className, ...props }, ref) => {
    const classes = clsx(styles.root, className);

    return (
      <button ref={ref} className={classes} {...props}>
        {icon}
      </button>
    );
  },
);
