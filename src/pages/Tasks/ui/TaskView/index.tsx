import { DragDropContext } from '@hello-pangea/dnd';
import clsx from 'clsx';
import { m } from 'framer-motion';
import { type ReactNode } from 'react';
import { useDashboardSidebarStore } from '@/widgets/dashboard-sidebar';
import { brakepointsConfig } from '@/shared/config/brakepoints';
import { getVw } from '@/shared/lib/get-vw';
import { useTaskDnd } from '../../model/useTaskDnd';
import styles from './TaskView.module.css';

interface TaskViewProps {
  children: ReactNode;
  className: string;
  modalSlot?: ReactNode;
}

export const TaskView = ({ children, modalSlot, className }: TaskViewProps) => {
  const { isCollapsed } = useDashboardSidebarStore();
  const { onDragEnd } = useTaskDnd();

  const isMobile = getVw() < brakepointsConfig.mobile;

  const classes = clsx(styles.root, className, {
    [styles.full]: isCollapsed && !isMobile,
    [styles.mobile]: isMobile,
  });

  const width = isMobile ? undefined : getVw() - (isCollapsed ? 120 : 360);

  return (
    <>
      <m.div
        className={classes}
        animate={{ width }}
        transition={isMobile ? { duration: 0 } : undefined}
      >
        <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
      </m.div>
      {modalSlot}
    </>
  );
};
