import { TaskOption } from '@/entities/task';
import { DeleteIcon } from '@/shared/ui/icons/DeleteIcon';
import { useDeleteTask } from '../../model/useDeleteTask';

interface DeleteTaskOptionProps {
  id: string;
}

export const DeleteTaskOption = ({ id }: DeleteTaskOptionProps) => {
  const { deleteTask } = useDeleteTask();

  return (
    <TaskOption onClick={() => deleteTask(id)}>
      <DeleteIcon /> Удалить
    </TaskOption>
  );
};
