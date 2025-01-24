import { ClockIcon } from '@/shared/ui/icons/ClockIcon';
import { formatMinutesToStringTime } from '../../lib/formatMinutesToStringTime';
import styles from './ExecutionTime.module.css';

interface ExecutionTimeProps {
  executionTime: number;
}

export const ExecutionTime = ({ executionTime }: ExecutionTimeProps) => {
  return (
    <div className={styles.root}>
      <ClockIcon />
      {formatMinutesToStringTime(executionTime)}
    </div>
  );
};
