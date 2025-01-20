import { type Task } from '@/entities/task';
import { filterTasksByGroup } from '../../lib/filter-tasks-by-group';
import { type TaskGroup } from '../../model/task-groups';
import styles from './ListRow.module.css';

interface ListRowProps {
  group: TaskGroup;
  tasks: Task[];
}

export const ListRow = ({ group, tasks }: ListRowProps) => {
  const filteredTasks = filterTasksByGroup(tasks, group.value);

  return (
    <div className={styles.root}>
      <div className={styles.title}>{group.label}</div>
      <div className={styles.tasks}>
        {filteredTasks.map((task) => (
          <div>{task.title}</div>
        ))}
      </div>
    </div>
  );
};
