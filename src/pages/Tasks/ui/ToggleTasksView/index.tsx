import { TasksView, useTasksStore } from '../../model/store';
import styles from './ToggleTasksView.module.css';

export const ToggleTasksView = () => {
  const { tasksView, setTasksView } = useTasksStore();
  const getButtonClasses = (buttonTasksView: TasksView) =>
    tasksView === buttonTasksView ? styles.active : '';

  return (
    <div className={styles.root}>
      <button
        className={getButtonClasses('board')}
        onClick={() => setTasksView('board')}
      >
        Доска
      </button>
      <button
        className={getButtonClasses('list')}
        onClick={() => setTasksView('list')}
      >
        Список
      </button>
    </div>
  );
};
