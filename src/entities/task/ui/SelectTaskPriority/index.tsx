import { AnimatePresence, m } from 'framer-motion';
import { useRef } from 'react';
import { TaskPriority } from '@/entities/task';
import { TaskPriorityBadge } from '@/entities/task/ui/TaskPriorityBadge';
import { usePopup } from '@/shared/lib/usePopup';
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
      <AnimatePresence>
        {isOpen && (
          <m.ul
            className={styles.priorities}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
          >
            {PRIORITIES.map((priority) => (
              <TaskPriorityBadge
                key={priority}
                priority={priority}
                onClick={() => selectPriorityHandler(priority)}
              />
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
