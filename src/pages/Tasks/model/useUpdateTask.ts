import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateTaskDto, taskQueries, taskService } from '@/entities/task';

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: updateTask } = useMutation({
    mutationKey: ['task', 'update'],
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTaskDto }) =>
      taskService.update(id, dto),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: taskQueries.lists(),
      });
    },
  });

  return { updateTask };
};
