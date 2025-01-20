import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { taskQueries } from '@/entities/task';
import { useTasksStore } from '../../model/store';
import { taskGroups } from '../../model/task-groups';
import { ListRow } from '../ListRow';
import { TaskView } from '../TaskView';
import styles from './ListView.module.css';

export const ListView = () => {
  const { data } = useQuery(taskQueries.list());
  const { setTasks, tasks } = useTasksStore();

  useEffect(() => {
    setTasks(data || []);
  }, [data]);

  return (
    <TaskView className={styles.root}>
      {taskGroups.map((group) => (
        <ListRow key={group.value} group={group} tasks={tasks} />
      ))}
    </TaskView>
  );
};
