import { create } from 'zustand';

export type TasksView = 'board' | 'list';

interface TasksStore {
  tasksView: TasksView;
  setTasksView: (tasksView: TasksView) => void;
}

export const useTasksStore = create<TasksStore>()((set) => ({
  tasksView: 'board',
  setTasksView: (tasksView: TasksView) => set({ tasksView }),
}));
