import { ActivityCalendar } from '../ActivityCalendar';
import styles from './Analytics.module.css';

export const Analytics = () => {
  return (
    <div className={styles.root}>
      <div className={styles.analytic}>
        <h3 className={styles.heading}>Выполненные задачи</h3>
        <ActivityCalendar />
      </div>
    </div>
  );
};
