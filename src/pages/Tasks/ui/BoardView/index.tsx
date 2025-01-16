import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { m } from 'framer-motion';
import { useDashboardSidebarStore } from '@/widgets/dashboard-sidebar';
import { taskQueries } from '@/entities/task';
import { taskGroups } from '../../model/task-groups';
import { BoardColumn } from '../BoardColumn';
import styles from './BoardView.module.css';

export const BoardView = () => {
  const { data: tasks } = useQuery(taskQueries.list());
  const { isCollapsed } = useDashboardSidebarStore();
  const getVw = () =>
    Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

  const classes = clsx(styles.root, {
    [styles.full]: isCollapsed,
  });

  return (
    <m.div
      className={classes}
      animate={{ width: getVw() - (isCollapsed ? 120 : 360) }}
    >
      {taskGroups?.map((group) => (
        <BoardColumn key={group.value} group={group} tasks={tasks || []} />
      ))}
    </m.div>
  );
};
