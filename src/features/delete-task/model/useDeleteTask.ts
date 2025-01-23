import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { taskQueries, taskService } from '@/entities/task';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { toastifyError } from '@/shared/lib/toastify-error';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTask } = useMutation({
    mutationKey: ['task', 'delete'],
    mutationFn: (id: string) => taskService.delete(id),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: taskQueries.lists() });
    },
    onError: (error) => toastifyError(getErrorMessage(error)),
  });

  return { deleteTask };
};
