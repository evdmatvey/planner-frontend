import { useTasksStore } from '../../model/store';
import { BoardView } from '../BoardView';
import { ListView } from '../ListView';
import { ToggleTasksView } from '../ToggleTasksView';
import styles from './Tasks.module.css';

export const Tasks = () => {
  const { tasksView } = useTasksStore();

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Задачи</h1>
      <ToggleTasksView />
      {tasksView === 'board' ? <BoardView /> : <ListView />}
    </div>
  );
};
