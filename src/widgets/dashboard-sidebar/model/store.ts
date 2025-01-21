import { create } from 'zustand';
import { useLocalStorage } from '@/shared/lib/useLocalStorage';

interface DashboardSidebarStore {
  isCollapsed: boolean;
  toggleIsCollapsed: () => void;
}

export const useDashboardSidebarStore = create<DashboardSidebarStore>()((
  set,
) => {
  const { getValue, setValue } = useLocalStorage('is-collapsed', false);

  return {
    isCollapsed: getValue(),
    toggleIsCollapsed: () => {
      set((state) => {
        const newIsCollapsed = !state.isCollapsed;

        setValue(newIsCollapsed);

        return {
          isCollapsed: newIsCollapsed,
        };
      });
    },
  };
});
