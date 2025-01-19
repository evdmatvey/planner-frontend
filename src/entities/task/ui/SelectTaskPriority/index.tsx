import { useRef } from 'react';
import { TaskPriority } from '@/entities/task';
import { TaskPriorityBadge } from '@/entities/task/ui/TaskPriorityBadge';
import { usePopup } from '@/shared/lib/usePopup';
import { AnimatedPopup } from '@/shared/ui/AnimatedPopup';
import { useSelectTaskPriorityState } from '../../model/useSelectTaskPriorityState';
import styles from './SelectTaskPriority.module.css';

interface SelectTaskPriorityProps {
  defaultPriority: TaskPriority | undefined;
  onChange: (priority: TaskPriority | undefined) => void;
}

const PRIORITIES = [
  TaskPriority.HIGH,
  TaskPriority.MEDIUM,
  TaskPriority.LOW,
] as const;

export const SelectTaskPriority = ({
  onChange,
  defaultPriority,
}: SelectTaskPriorityProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, togglePopupHandler } = usePopup(ref);

  const { selectedPriority, selectPriorityHandler } =
    useSelectTaskPriorityState(
      defaultPriority,
      (priority: TaskPriority | undefined) => {
        onChange(priority);
        togglePopupHandler();
      },
    );

  return (
    <div className={styles.root} ref={ref}>
      <div className={styles.heading} onClick={togglePopupHandler}>
        {selectedPriority ? (
          <TaskPriorityBadge priority={selectedPriority} />
        ) : (
          <div className={styles.title}>Выберите приоритет</div>
        )}
      </div>
      <AnimatedPopup isOpen={isOpen} className={styles.priorities}>
        {PRIORITIES.map((priority) => (
          <TaskPriorityBadge
            key={priority}
            priority={priority}
            onClick={() => selectPriorityHandler(priority)}
          />
        ))}
      </AnimatedPopup>
    </div>
  );
};
