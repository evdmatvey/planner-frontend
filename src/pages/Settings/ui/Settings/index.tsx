import { UpdateProfileForm } from '../UpdateProfileForm';
import styles from './Settings.module.css';

export const Settings = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Настройки</h1>

      <div className={styles.settings}>
        <UpdateProfileForm />
      </div>
    </div>
  );
};
