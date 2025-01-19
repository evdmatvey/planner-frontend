import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { UpdateTaskDto, taskQueries, taskService } from '@/entities/task';
import { cleanDto } from '@/shared/lib/clean-dto';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { toastifyError } from '@/shared/lib/toastify-error';

export const useUpdateTask = (taskId: string, successCallback: () => void) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['task', 'update'],
    mutationFn: (dto: UpdateTaskDto) => taskService.update(taskId, dto),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.refetchQueries({ queryKey: taskQueries.lists() });
      successCallback();
    },
    onError: (error) => {
      toastifyError(getErrorMessage(error));
    },
  });

  const updateTaskHandler = (dto: UpdateTaskDto) => {
    const cleanedDto = cleanDto(dto);

    if (!cleanedDto.title) {
      toast.error('Укажите название задачи!');
      return;
    }

    mutate(dto);
  };

  return { updateTaskHandler };
};
