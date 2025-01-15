import { ClockIcon } from '@/shared/ui/icons/ClockIcon';
import { formatMinutesToTime } from '../../lib/formatMunutesToTime';
import styles from './TaskExecutionTime.module.css';

interface TaskExecutionTimeProps {
  executionTime: number;
}

export const TaskExecutionTime = ({
  executionTime,
}: TaskExecutionTimeProps) => {
  return (
    <div className={styles.root}>
      <ClockIcon />
      {formatMinutesToTime(executionTime)}
    </div>
  );
};
