import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateTaskDto, taskQueries, taskService } from '@/entities/task';

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: createTask } = useMutation({
    mutationKey: ['task', 'create'],
    mutationFn: (dto: CreateTaskDto) => taskService.create(dto),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: taskQueries.lists(),
      });
    },
  });

  return { createTask };
};
