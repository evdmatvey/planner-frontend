import { BoardView } from '../BoardView';
import { ToggleTasksView } from '../ToggleTasksView';
import styles from './Tasks.module.css';

export const Tasks = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Задачи</h1>
      <ToggleTasksView />
      <BoardView />
    </div>
  );
};
