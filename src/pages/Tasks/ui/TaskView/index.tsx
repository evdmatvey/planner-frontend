import { DragDropContext } from '@hello-pangea/dnd';
import clsx from 'clsx';
import { m } from 'framer-motion';
import { type ReactNode } from 'react';
import { useDashboardSidebarStore } from '@/widgets/dashboard-sidebar';
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

  const classes = clsx(styles.root, className, {
    [styles.full]: isCollapsed,
  });

  return (
    <>
      <m.div
        className={classes}
        animate={{ width: getVw() - (isCollapsed ? 120 : 360) }}
      >
        <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
      </m.div>
      {modalSlot}
    </>
  );
};
