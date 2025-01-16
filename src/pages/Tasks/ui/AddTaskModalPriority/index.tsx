import { useRef, useState } from 'react';
import { TaskPriority } from '@/entities/task';
import { TaskPriorityBadge } from '@/entities/task/ui/TaskPriorityBadge';
import { usePopup } from '@/shared/lib/usePopup';
import styles from './AddTaskModalPriority.module.css';

interface AddTaskModalPriority {
  priority: TaskPriority | undefined;
  onChange: (priority: TaskPriority) => void;
}

const PRIORITIES = [
  TaskPriority.HIGH,
  TaskPriority.MEDIUM,
  TaskPriority.LOW,
] as const;

export const AddTaskModalPriority = ({
  onChange,
  priority,
}: AddTaskModalPriority) => {
  const [selectedPriority, setSelectedPriority] = useState<
    TaskPriority | undefined
  >(priority);
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, togglePopupHandler } = usePopup(ref);

  const selectPriorityHandler = (priority: TaskPriority) => {
    setSelectedPriority(priority);
    onChange(priority);
  };

  return (
    <div key="priority" className={styles.root} ref={ref}>
      <div className={styles.heading} onClick={togglePopupHandler}>
        {selectedPriority ? (
          <div className={styles.selected_priority}>
            <TaskPriorityBadge priority={selectedPriority} />
          </div>
        ) : (
          <div className={styles.title}>Выберите приоритет</div>
        )}
      </div>
      {isOpen && (
        <ul className={styles.priorities}>
          {PRIORITIES.map((priority) => (
            <div
              key={priority}
              className={styles.priority}
              onClick={() => selectPriorityHandler(priority)}
            >
              <TaskPriorityBadge priority={priority} />
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
