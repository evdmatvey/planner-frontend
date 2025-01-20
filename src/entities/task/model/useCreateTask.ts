import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { toastifyError } from '@/shared/lib/toastify-error';
import { type CreateTaskDto } from '../api/dto/create-task.dto';
import { type CreateTaskResponse } from '../api/dto/task.response';
import { taskQueries } from '../api/task.queries';
import { taskService } from '../api/task.service';

type CreateTaskCallback = (data?: CreateTaskResponse) => void;

export const useCreateTask = (callback?: CreateTaskCallback) => {
  const queryClient = useQueryClient();

  const { mutate: createTask } = useMutation({
    mutationKey: ['task', 'create'],
    mutationFn: (dto: CreateTaskDto) => taskService.create(dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: taskQueries.lists(),
      });

      if (callback) callback(data);
    },
    onError: (error) => toastifyError(getErrorMessage(error)),
  });

  return { createTask };
};
