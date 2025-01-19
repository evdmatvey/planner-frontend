import { DropResult } from '@hello-pangea/dnd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  UpdateTaskDto,
  taskQueries,
  taskService,
  useToggleCompleteTask,
} from '@/entities/task';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { toastifyError } from '@/shared/lib/toastify-error';
import { referenceDateForValue } from '../lib/filter-tasks-by-group';
import { TaskGroupValue } from './task-groups';

export const useTaskDnd = () => {
  const { mutate: toggleCompleteTask } = useToggleCompleteTask();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['task', 'dnd update'],
    mutationFn: ({ taskId, dto }: { taskId: string; dto: UpdateTaskDto }) =>
      taskService.update(taskId, dto),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.refetchQueries({ queryKey: taskQueries.lists() });
    },
    onError: (error) => {
      toastifyError(getErrorMessage(error));
    },
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const destinationColumnId = result.destination
      .droppableId as TaskGroupValue;
    const taskId = result.draggableId;

    if (destinationColumnId === result.source.droppableId) return;

    if (destinationColumnId === 'completed') {
      toggleCompleteTask(taskId);
      return;
    }

    mutate({
      taskId,
      dto: {
        createdAt: referenceDateForValue[destinationColumnId].toISOString(),
        isCompleted: false,
      },
    });
  };

  return { onDragEnd };
};
