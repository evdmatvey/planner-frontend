import { type ChangeEvent, useState } from 'react';
import { TransparentInput } from '@/shared/ui/TransparentInput';
import { formatMinutesToStringTime } from '../../lib/formatMinutesToStringTime';
import { transformStringTimeToMinutes } from '../../lib/transformStringTimeToMinutes';

interface ExecutionTimeInputProps {
  variant?: 'transparent' | 'underscore';
  defaultExecutionTime?: number;
  onChange: (executionTime?: number) => void;
}

export const ExecutionTimeInput = ({
  variant,
  defaultExecutionTime,
  onChange,
}: ExecutionTimeInputProps) => {
  const [selectedExecutionTime, setExecutionTime] = useState(
    formatMinutesToStringTime(defaultExecutionTime ?? 0),
  );

  const changeExecutionTimeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const executionTime = event.target.value;
    const executionTimeInMinutes = +executionTime;
    const newExecutionTime = Number.isNaN(executionTimeInMinutes)
      ? transformStringTimeToMinutes(executionTime)
      : executionTimeInMinutes;

    onChange(newExecutionTime !== 0 ? newExecutionTime : undefined);
    setExecutionTime(executionTime);
  };

  return (
    <TransparentInput
      placeholder="Время на выполнение"
      variant={variant}
      value={selectedExecutionTime}
      onChange={changeExecutionTimeHandler}
    />
  );
};
