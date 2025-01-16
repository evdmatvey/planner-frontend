import { create } from 'zustand';
import { Task } from '@/entities/task';

export type TasksView = 'board' | 'list';

interface TasksStore {
  tasksView: TasksView;
  tasks: Task[];
  setTasksView: (tasksView: TasksView) => void;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
}

export const useTasksStore = create<TasksStore>()((set) => ({
  tasksView: 'board',
  tasks: [],
  setTasksView: (tasksView: TasksView) => set({ tasksView }),
  setTasks: (tasks: Task[]) => set({ tasks }),
  addTask: (task: Task) => set((store) => ({ tasks: [...store.tasks, task] })),
}));
