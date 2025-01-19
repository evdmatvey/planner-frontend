import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CreateTaskDto, taskQueries, taskService } from '@/entities/task';
import { cleanDto } from '@/shared/lib/clean-dto';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { toastifyError } from '@/shared/lib/toastify-error';

export const useCreateTask = (successCallback: () => void) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['task', 'create'],
    mutationFn: (dto: CreateTaskDto) => taskService.create(dto),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.refetchQueries({ queryKey: taskQueries.lists() });
      successCallback();
    },
    onError: (error) => {
      toastifyError(getErrorMessage(error));
    },
  });

  const createTaskHandler = (dto: CreateTaskDto) => {
    const cleanedDto = cleanDto(dto);

    if (!cleanedDto.title) {
      toast.error('Укажите название задачи!');
      return;
    }

    mutate(cleanedDto as CreateTaskDto);
  };

  return { createTaskHandler };
};
