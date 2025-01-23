import '@/entities/task';
import { Task } from '@/entities/task';
import { TaskOption } from '@/entities/task/ui/TaskOption';
import { CheckIcon } from '@/shared/ui/icons/CheckIcon';
import { CloseIcon } from '@/shared/ui/icons/CloseIcon';
import { useToggleCompleteTask } from '../../model/useToggleCompleteTask';

interface ToggleCompleteTaskProps {
  task: Task;
}

export const ToggleCompleteTask = ({ task }: ToggleCompleteTaskProps) => {
  const { toggleCompleteTask } = useToggleCompleteTask();

  return (
    <TaskOption onClick={() => toggleCompleteTask(task.id)}>
      {task.isCompleted ? (
        <>
          <CloseIcon /> Откатить
        </>
      ) : (
        <>
          <CheckIcon /> Выполнить
        </>
      )}
    </TaskOption>
  );
};
