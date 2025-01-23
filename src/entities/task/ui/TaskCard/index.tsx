import clsx from 'clsx';
import { type ReactNode, useRef } from 'react';
import { TagList } from '@/entities/tag/@x/task';
import { usePopup } from '@/shared/lib/usePopup';
import { AnimatedPopup } from '@/shared/ui/AnimatedPopup';
import { DeleteIcon } from '@/shared/ui/icons/DeleteIcon';
import { EditIcon } from '@/shared/ui/icons/EditIcon';
import { OptionsIcon } from '@/shared/ui/icons/OptionsIcon';
import { useTaskModalStore } from '../../model/task-modal.store';
import { Task } from '../../model/task.types';
import { useDeleteTask } from '../../model/useDeleteTask';
import { TaskExecutionTime } from '../TaskExecutionTime';
import { TaskOption } from '../TaskOption';
import { TaskPriorityBadge } from '../TaskPriorityBadge';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  optionsSlot?: ReactNode;
}

export const TaskCard = ({ task, optionsSlot }: TaskCardProps) => {
  const { id, isCompleted, title, description, priority, executionTime, tags } =
    task;
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, togglePopupHandler } = usePopup(ref);
  const { mutate: deleteTaskHandler } = useDeleteTask();
  const { openUpdateModal, setTaskData } = useTaskModalStore();
  const classes = clsx(styles.root, {
    [styles.completed]: isCompleted,
  });

  const updateTaskHandler = () => {
    setTaskData({ ...task });
    openUpdateModal();
    togglePopupHandler();
  };

  return (
    <>
      <div className={classes} ref={ref}>
        <button className={styles.options} onClick={togglePopupHandler}>
          <OptionsIcon />
        </button>
        <AnimatedPopup className={styles.popup} isOpen={isOpen}>
          <TaskOption onClick={updateTaskHandler}>
            <EditIcon /> Редактировать
          </TaskOption>
          {optionsSlot}
          <TaskOption onClick={() => deleteTaskHandler(id)}>
            <DeleteIcon /> Удалить
          </TaskOption>
        </AnimatedPopup>
        <div className={styles.text}>
          <h5 className={styles.title}>{title}</h5>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        {(priority || executionTime) && (
          <div className={styles.info}>
            {priority && <TaskPriorityBadge priority={priority} />}
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
