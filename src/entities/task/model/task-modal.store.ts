import { create } from 'zustand';
import { type Task } from './task.types';

type TaskModelVariant = 'update' | 'create';

interface TaskModalStore {
  isModalOpen: boolean;
  modalVariant: TaskModelVariant | null;
  taskData: Partial<Task> | null;
  setTaskData: (data: Partial<Task>) => void;
  openUpdateModal: () => void;
  openCreateModal: () => void;
  closeModal: () => void;
}

export const useTaskModalStore = create<TaskModalStore>()((set) => ({
  isModalOpen: false,
  modalVariant: null,
  taskData: null,
  setTaskData: (data: Partial<Task>) => set({ taskData: data }),
  openUpdateModal: () => set({ isModalOpen: true, modalVariant: 'update' }),
  openCreateModal: () => set({ isModalOpen: true, modalVariant: 'create' }),
  closeModal: () =>
    set({ isModalOpen: false, modalVariant: null, taskData: null }),
}));
