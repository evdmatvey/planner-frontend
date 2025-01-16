import { TagBadge } from '@/entities/tag';
import { Task } from '../../model/task.types';
import { TaskExecutionTime } from '../TaskExecutionTime';
import { TaskPriorityBadge } from '../TaskPriorityBadge';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const { title, description, priority, executionTime, tags } = task;

  return (
    <div className={styles.root}>
      <div className={styles.text}>
        <h5 className={styles.title}>{title}</h5>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {(priority || executionTime) && (
        <div className={styles.info}>
          {priority && <TaskPriorityBadge priority={priority} />}
          {executionTime && <TaskExecutionTime executionTime={executionTime} />}
        </div>
      )}

      {tags.length !== 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <TagBadge key={tag.id} tag={tag} />
          ))}
        </div>
      )}
    </div>
  );
};
