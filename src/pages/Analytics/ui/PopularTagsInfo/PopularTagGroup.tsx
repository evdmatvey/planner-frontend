import { type TasksInfo } from '@/entities/analytics';
import { ExecutionTime } from '@/entities/execution-time';
import styles from './PopularTagsInfo.module.css';

interface PopularTagGroupProps {
  title: string;
  tasksInfo: TasksInfo;
}

export const PopularTagGroup = ({ title, tasksInfo }: PopularTagGroupProps) => {
  return (
    <div className={styles.group}>
      <div className={styles.count}>
        <div className={styles.title}>{title}:</div>
        <div className={styles.value}>{tasksInfo.count}</div>
      </div>
      {tasksInfo.executionTime !== 0 && (
        <ExecutionTime executionTime={tasksInfo.executionTime} />
      )}
    </div>
  );
};
