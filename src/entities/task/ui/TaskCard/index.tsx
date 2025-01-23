import clsx from 'clsx';
import { type ReactNode, useRef } from 'react';
import { PriorityBadge } from '@/entities/priority/@x/task';
import { TagList } from '@/entities/tag/@x/task';
import { usePopup } from '@/shared/lib/usePopup';
import { AnimatedPopup } from '@/shared/ui/AnimatedPopup';
import { OptionsIcon } from '@/shared/ui/icons/OptionsIcon';
import { Task } from '../../model/task.types';
import { TaskExecutionTime } from '../TaskExecutionTime';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  optionsSlot?: ReactNode;
}

export const TaskCard = ({ task, optionsSlot }: TaskCardProps) => {
  const { isCompleted, title, description, priority, executionTime, tags } =
    task;
  const ref = useRef<HTMLButtonElement>(null);
  const { isOpen, togglePopupHandler } = usePopup(ref);
  const classes = clsx(styles.root, {
    [styles.completed]: isCompleted,
  });

  return (
    <>
      <div className={classes}>
        <button
          ref={ref}
          className={styles.options}
          onClick={togglePopupHandler}
        >
          <OptionsIcon />
        </button>
        <AnimatedPopup className={styles.popup} isOpen={isOpen}>
          {optionsSlot}
        </AnimatedPopup>
        <div className={styles.text}>
          <h5 className={styles.title}>{title}</h5>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        {(priority || executionTime) && (
          <div className={styles.info}>
            {priority && <PriorityBadge priority={priority} />}
            {executionTime && (
              <TaskExecutionTime executionTime={executionTime} />
            )}
          </div>
        )}

        {tags.length !== 0 && <TagList tags={tags} />}
      </div>
    </>
  );
};
