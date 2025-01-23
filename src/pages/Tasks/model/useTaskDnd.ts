import { DropResult } from '@hello-pangea/dnd';
import toast from 'react-hot-toast';
import { useToggleCompleteTask } from '@/features/toggle-complete-task';
import { useUpdateTask } from '@/features/update-task';
import { referenceDateForValue } from '../lib/filter-tasks-by-group';
import { TaskGroupValue } from './task-groups';

export const useTaskDnd = () => {
  const { toggleCompleteTask } = useToggleCompleteTask();
  const { updateTask } = useUpdateTask((data) => {
    toast.success(data?.message as string);
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

    updateTask({
      id: taskId,
      dto: {
        createdAt: referenceDateForValue[destinationColumnId].toISOString(),
        isCompleted: false,
      },
    });
  };

  return { onDragEnd };
};
