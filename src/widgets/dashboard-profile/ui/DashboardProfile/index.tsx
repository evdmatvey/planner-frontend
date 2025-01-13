import clsx from 'clsx';
import { useRef } from 'react';
import { useGetProfile } from '@/entities/user';
import { usePopup } from '@/shared/lib/usePopup';
import { ArrowDownIcon } from '@/shared/ui/icons/ArrowDownIcon';
import { ProfilePopup } from '../ProfilePopup';
import styles from './DashboardProfile.module.css';

export const DashboardProfile = () => {
  const { data } = useGetProfile();
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, togglePopupHandler } = usePopup(ref);

  const username = data?.name ? data.name : data?.email;
  const classes = clsx(styles.root, {
    [styles.open]: isOpen,
  });

  return (
    <div className={classes} ref={ref}>
      <div className={styles.user} onClick={togglePopupHandler}>
        <div className={styles.icon}>{username?.charAt(0)}</div>
        <div className={styles.username}>
          {username}
          <span className={styles.arrow}>
            <ArrowDownIcon />
          </span>
        </div>
      </div>
      <ProfilePopup isOpen={isOpen} />
    </div>
  );
};
