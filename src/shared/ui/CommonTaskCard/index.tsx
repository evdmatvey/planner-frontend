import clsx from 'clsx';
import { ReactNode, useRef } from 'react';
import { usePopup } from '@/shared/lib/usePopup';
import { AnimatedPopup } from '../AnimatedPopup';
import { IconButton } from '../IconButton';
import { OptionsIcon } from '../icons/OptionsIcon';
import styles from './CommonTaskCard.module.css';

interface CommonTaskCardProps {
  title: string;
  description?: string;
  isCompleted?: boolean;
  optionsSlot?: ReactNode;
  children?: ReactNode;
}

export const CommonTaskCard = ({
  title,
  description,
  isCompleted,
  optionsSlot,
  children,
}: CommonTaskCardProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { isOpen, togglePopupHandler } = usePopup(ref);
  const classes = clsx(styles.root, {
    [styles.completed]: isCompleted,
  });

  return (
    <div className={classes}>
      {optionsSlot && (
        <IconButton
          ref={ref}
          className={styles.options}
          onClick={togglePopupHandler}
          icon={<OptionsIcon />}
        />
      )}
      <AnimatedPopup className={styles.popup} isOpen={isOpen}>
        {optionsSlot}
      </AnimatedPopup>
      <div className={styles.text}>
        <h5 className={styles.title}>{title}</h5>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {children}
    </div>
  );
};
