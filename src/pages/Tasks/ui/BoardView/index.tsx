import { useQuery } from '@tanstack/react-query';
import { UpdateTaskModal } from '@/features/update-task';
import { TaskModal, taskQueries } from '@/entities/task';
import { taskGroups } from '../../model/task-groups';
import { BoardColumn } from '../BoardColumn';
import { TaskView } from '../TaskView';
import styles from './BoardView.module.css';

export const BoardView = () => {
  const { data: tasks } = useQuery(taskQueries.list());

  return (
    <TaskView
      className={styles.root}
      modalSlot={<TaskModal updateModal={<UpdateTaskModal />} />}
    >
      {taskGroups?.map((group) => (
        <BoardColumn key={group.value} group={group} tasks={tasks || []} />
      ))}
    </TaskView>
  );
};
