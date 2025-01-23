import clsx from 'clsx';
import { Color } from '@/shared/model/color.types';
import { TextedBadge } from '@/shared/ui/Badge';
import { Priority } from '../../model/priority.types';
import styles from './PriorityBadge.module.css';

interface PriorityBadgeProps {
  priority: keyof typeof Priority;
  onClick?: () => void;
}

export const PriorityBadge = ({ priority, onClick }: PriorityBadgeProps) => {
  const classes = clsx({
    [styles.root]: onClick,
  });

  const colors: Record<keyof typeof Priority, Color> = {
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
