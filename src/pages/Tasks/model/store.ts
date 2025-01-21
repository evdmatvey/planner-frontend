import { create } from 'zustand';
import { Task } from '@/entities/task';
import { useLocalStorage } from '@/shared/lib/useLocalStorage';

export type TasksView = 'board' | 'list';

interface TasksStore {
  tasksView: TasksView;
  tasks: Task[];
  setTasksView: (tasksView: TasksView) => void;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
}

export const useTasksStore = create<TasksStore>()((set) => {
  const { getValue, setValue } = useLocalStorage<TasksView>(
    'board-view',
    'board',
  );

  return {
    tasksView: getValue(),
    tasks: [],
    setTasksView: (tasksView: TasksView) => {
      setValue(tasksView);
      set({ tasksView });
    },
    setTasks: (tasks: Task[]) => set({ tasks }),
    addTask: (task: Task) =>
      set((store) => ({ tasks: [...store.tasks, task] })),
  };
});
