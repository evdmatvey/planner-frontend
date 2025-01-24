import { ExecutionTime } from '@/entities/execution-time';
import { type Task } from '@/entities/task';
import styles from './GroupTitle.module.css';

interface GroupTitleProps {
  title: string;
  tasks: Task[];
}

export const GroupTitle = ({ title, tasks }: GroupTitleProps) => {
  const elementsCount = tasks.length;
  const wrappedElementsCount = `(${elementsCount})`;
  const totalExecutionTime = tasks.reduce(
    (acc, task) => acc + (task.executionTime ?? 0),
    0,
  );

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {title} {elementsCount > 0 && wrappedElementsCount}
      </div>
      {totalExecutionTime !== 0 && (
        <div className={styles.time}>
          <ExecutionTime executionTime={totalExecutionTime} />
        </div>
      )}
    </div>
  );
};
