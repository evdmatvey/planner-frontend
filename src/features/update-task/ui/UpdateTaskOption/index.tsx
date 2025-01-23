import { type Task, TaskOption, useTaskModalStore } from '@/entities/task';
import { EditIcon } from '@/shared/ui/icons/EditIcon';

interface UpdateTaskOptionProps {
  task: Task;
}

export const UpdateTaskOption = ({ task }: UpdateTaskOptionProps) => {
  const { openUpdateModal, setTaskData } = useTaskModalStore();

  const updateTaskHandler = () => {
    setTaskData({ ...task });
    openUpdateModal();
  };
  return (
    <TaskOption onClick={updateTaskHandler}>
      <EditIcon /> Редактировать
    </TaskOption>
  );
};
