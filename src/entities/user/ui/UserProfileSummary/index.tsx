import clsx from 'clsx';
import { User } from '../../model/user.types';
import styles from './UserProfileSummary.module.css';

interface UserProfileSummaryProps {
  profile: User;
  size?: 'small' | 'medium' | 'large';
}

export const UserProfileSummary = ({
  profile,
  size = 'medium',
}: UserProfileSummaryProps) => {
  const { name, email } = profile;

  const profileName = name ?? email;
  const avatarPlaceholder = profileName.charAt(0).toUpperCase();

  const classes = clsx(styles.root, styles[size]);

  return (
    <div className={classes}>
      <div className={styles.avatar}>{avatarPlaceholder}</div>
      <div className={styles.username}>{profileName}</div>
    </div>
  );
};
