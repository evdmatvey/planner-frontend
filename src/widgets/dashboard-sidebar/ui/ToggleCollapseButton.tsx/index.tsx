import { IconButton } from '@/shared/ui/IconButton';
import { ExpendLeftIcon } from '@/shared/ui/icons/ExpendLeftIcon';
import { ExpendRightIcon } from '@/shared/ui/icons/ExpendRightIcon';
import { useDashboardSidebarStore } from '../../model/store';
import styles from './ToggleCollapseButton.module.css';

export const ToggleCollapseButton = () => {
  const { isCollapsed, toggleIsCollapsed } = useDashboardSidebarStore();

  return (
    <IconButton
      className={styles.root}
      onClick={toggleIsCollapsed}
      icon={isCollapsed ? <ExpendRightIcon /> : <ExpendLeftIcon />}
    />
  );
};
