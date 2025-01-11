import { create } from 'zustand';

interface DashboardSidebarStore {
  isCollapsed: boolean;
  toggleIsCollapsed: () => void;
}

export const useDashboardSidebarStore = create<DashboardSidebarStore>()(
  (set) => ({
    isCollapsed: false,
    toggleIsCollapsed: () => {
      set((state) => ({
        isCollapsed: !state.isCollapsed,
      }));
    },
  }),
);
