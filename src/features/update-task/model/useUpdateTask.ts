import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  type UpdateTaskDto,
  type UpdateTaskResponse,
  taskQueries,
  taskService,
} from '@/entities/task';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { toastifyError } from '@/shared/lib/toastify-error';

type UpdateTaskCallback = (data?: UpdateTaskResponse) => void;
type UpdateTaskArguments = {
  id: string;
  dto: UpdateTaskDto;
};

export const useUpdateTask = (callback?: UpdateTaskCallback) => {
  const queryClient = useQueryClient();

  const { mutate: updateTask } = useMutation({
    mutationKey: ['task', 'update'],
    mutationFn: ({ id, dto }: UpdateTaskArguments) =>
      taskService.update(id, dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: taskQueries.lists(),
      });

      if (callback) callback(data);
    },
    onError: (error) => toastifyError(getErrorMessage(error)),
  });

  return { updateTask };
};
