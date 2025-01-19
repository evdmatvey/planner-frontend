import { DragDropContext } from '@hello-pangea/dnd';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { m } from 'framer-motion';
import { useDashboardSidebarStore } from '@/widgets/dashboard-sidebar';
import { TaskModal, taskQueries } from '@/entities/task';
import { taskGroups } from '../../model/task-groups';
import { useTaskDnd } from '../../model/useTaskDnd';
import { BoardColumn } from '../BoardColumn';
import styles from './BoardView.module.css';

export const BoardView = () => {
  const { data: tasks } = useQuery(taskQueries.list());
  const { isCollapsed } = useDashboardSidebarStore();
  const { onDragEnd } = useTaskDnd();
  const getVw = () =>
    Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

  const classes = clsx(styles.root, {
    [styles.full]: isCollapsed,
  });

  return (
    <>
      <m.div
        className={classes}
        animate={{ width: getVw() - (isCollapsed ? 120 : 360) }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <>
            {taskGroups?.map((group) => (
              <BoardColumn
                key={group.value}
                group={group}
                tasks={tasks || []}
              />
            ))}
          </>
        </DragDropContext>
      </m.div>
      <TaskModal />
    </>
  );
};
