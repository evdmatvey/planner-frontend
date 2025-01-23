import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  type CreateTaskDto,
  type CreateTaskResponse,
  taskQueries,
  taskService,
} from '@/entities/task';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { toastifyError } from '@/shared/lib/toastify-error';

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
