import { useRef } from 'react';
import { usePopup } from '@/shared/lib/usePopup';
import { AnimatedPopup } from '@/shared/ui/AnimatedPopup';
import { Priority } from '../../model/priority.types';
import { useSelectPriority } from '../../model/useSelectPriority';
import { PriorityBadge } from '../PriorityBadge';
import styles from './SelectPriority.module.css';

interface SelectPriorityProps {
  defaultPriority: Priority | undefined;
  onChange: (priority: Priority | undefined) => void;
}

const PRIORITIES = [Priority.HIGH, Priority.MEDIUM, Priority.LOW] as const;

export const SelectPriority = ({
  onChange,
  defaultPriority,
}: SelectPriorityProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, togglePopupHandler } = usePopup(ref);

  const { selectedPriority, selectPriorityHandler } = useSelectPriority(
    defaultPriority,
    (priority: Priority | undefined) => {
      onChange(priority);
      togglePopupHandler();
    },
  );

  return (
    <div className={styles.root} ref={ref}>
      <div className={styles.heading} onClick={togglePopupHandler}>
        {selectedPriority ? (
          <PriorityBadge priority={selectedPriority} />
        ) : (
          <div className={styles.title}>Выберите приоритет</div>
        )}
      </div>
      <AnimatedPopup isOpen={isOpen} className={styles.priorities}>
        {PRIORITIES.map((priority) => (
          <PriorityBadge
            key={priority}
            priority={priority}
            onClick={() => selectPriorityHandler(priority)}
          />
        ))}
      </AnimatedPopup>
    </div>
  );
};
