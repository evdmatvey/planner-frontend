import { useRef } from 'react';
import { TagBadge } from '@/entities/tag';
import { usePopup } from '@/shared/lib/usePopup';
import { AnimatedPopup } from '@/shared/ui/AnimatedPopup';
import { CheckIcon } from '@/shared/ui/icons/CheckIcon';
import { CloseIcon } from '@/shared/ui/icons/CloseIcon';
import { DeleteIcon } from '@/shared/ui/icons/DeleteIcon';
import { EditIcon } from '@/shared/ui/icons/EditIcon';
import { OptionsIcon } from '@/shared/ui/icons/OptionsIcon';
import { Task } from '../../model/task.types';
import { useDeleteTask } from '../../model/useDeleteTask';
import { useToggleCompleteTask } from '../../model/useToggleCompleteTask';
import { TaskExecutionTime } from '../TaskExecutionTime';
import { TaskOption } from '../TaskOption';
import { TaskPriorityBadge } from '../TaskPriorityBadge';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const { id, isCompleted, title, description, priority, executionTime, tags } =
    task;
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, togglePopupHandler } = usePopup(ref);
  const { mutate: toggleTaskCompleteHandler } = useToggleCompleteTask();
  const { mutate: deleteTaskHandler } = useDeleteTask();

  return (
    <div className={styles.root} ref={ref}>
      <button className={styles.options} onClick={togglePopupHandler}>
        <OptionsIcon />
      </button>
      <AnimatedPopup className={styles.popup} isOpen={isOpen}>
        <TaskOption onClick={togglePopupHandler}>
          <EditIcon /> Редактировать
        </TaskOption>
        <TaskOption onClick={() => toggleTaskCompleteHandler(id)}>
          {isCompleted ? (
            <>
              <CloseIcon /> Откатить
            </>
          ) : (
            <>
              <CheckIcon /> Выполнить
            </>
          )}
        </TaskOption>
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
