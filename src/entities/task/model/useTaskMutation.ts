import toast from 'react-hot-toast';
import { cleanDto } from '@/shared/lib/clean-dto';
import { type CreateTaskDto } from '../api/dto/create-task.dto';
import { type UpdateTaskDto } from '../api/dto/update-task.dto';

type TaskMutationDto = UpdateTaskDto | CreateTaskDto;
type TaskMutationCallback = (dto: TaskMutationDto) => void;

export const useTaskMutation = (callback: TaskMutationCallback) => {
  const mutateTaskHandler = (dto: TaskMutationDto) => {
    const cleanedDto = cleanDto(dto);

    if (!cleanedDto.title) {
      toast.error('Укажите название задачи!');
      return;
    }

    callback(cleanedDto as TaskMutationDto);
  };

  return { mutateTaskHandler };
};
