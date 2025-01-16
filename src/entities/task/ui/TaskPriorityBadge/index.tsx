import { Color } from '@/shared/model/color.types';
import { TextedBadge } from '@/shared/ui/Badge';
import { TaskPriority } from '../../model/task.types';

interface TaskPriorityBadgeProps {
  priority: keyof typeof TaskPriority;
}

export const TaskPriorityBadge = ({ priority }: TaskPriorityBadgeProps) => {
  const colors: Record<keyof typeof TaskPriority, Color> = {
    HIGH: Color.RED,
    MEDIUM: Color.BLUE,
    LOW: Color.GREEN,
  };

  return (
    <TextedBadge
      type="color"
      color={colors[priority]}
      text={priority.toLowerCase()}
    />
  );
};
