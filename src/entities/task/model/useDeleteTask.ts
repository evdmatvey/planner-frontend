import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { toastifyError } from '@/shared/lib/toastify-error';
import { taskQueries } from '../api/task.queries';
import { taskService } from '../api/task.service';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['task', 'delete'],
    mutationFn: (id: string) => taskService.delete(id),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: taskQueries.lists() });
    },
    onError: (error) => toastifyError(getErrorMessage(error)),
  });

  return { mutate };
};
