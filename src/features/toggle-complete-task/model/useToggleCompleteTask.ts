import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { taskQueries, taskService } from '@/entities/task';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { toastifyError } from '@/shared/lib/toastify-error';

export const useToggleCompleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate: toggleCompleteTask } = useMutation({
    mutationKey: ['task', 'toggle-complete'],
    mutationFn: (id: string) => taskService.toggleComplete(id),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: taskQueries.lists() });
    },
    onError: (error) => toastifyError(getErrorMessage(error)),
  });

  return { toggleCompleteTask };
};
