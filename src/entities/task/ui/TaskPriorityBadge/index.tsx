import clsx from 'clsx';
import { Color } from '@/shared/model/color.types';
import { TextedBadge } from '@/shared/ui/Badge';
import { TaskPriority } from '../../model/task.types';
import styles from './TaskPriorityBadge.module.css';

interface TaskPriorityBadgeProps {
  priority: keyof typeof TaskPriority;
  onClick?: () => void;
}

export const TaskPriorityBadge = ({
  priority,
  onClick,
}: TaskPriorityBadgeProps) => {
  const classes = clsx({
    [styles.root]: onClick,
  });

  const colors: Record<keyof typeof TaskPriority, Color> = {
    HIGH: Color.RED,
    MEDIUM: Color.BLUE,
    LOW: Color.GREEN,
  };

  return (
    <div className={classes} onClick={onClick}>
      <TextedBadge
        type="color"
        color={colors[priority]}
        text={priority.toLowerCase()}
      />
    </div>
  );
};
