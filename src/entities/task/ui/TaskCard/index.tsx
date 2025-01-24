import { type ReactNode } from 'react';
import { ExecutionTime } from '@/entities/execution-time/@x/task';
import { PriorityBadge } from '@/entities/priority/@x/task';
import { TagList } from '@/entities/tag/@x/task';
import { CommonTaskCard } from '@/shared/ui/CommonTaskCard';
import { type Task } from '../../model/task.types';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  optionsSlot?: ReactNode;
}

export const TaskCard = ({ task, optionsSlot }: TaskCardProps) => {
  const { isCompleted, title, description, priority, executionTime, tags } =
    task;

  return (
    <CommonTaskCard
      title={title}
      description={description}
      isCompleted={isCompleted}
      optionsSlot={optionsSlot}
    >
      {(priority || executionTime) && (
        <div className={styles.info}>
          {priority && <PriorityBadge priority={priority} />}
          {executionTime && <ExecutionTime executionTime={executionTime} />}
        </div>
      )}

      {tags.length !== 0 && <TagList tags={tags} />}
    </CommonTaskCard>
  );
};
