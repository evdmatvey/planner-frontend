import { Draggable, Droppable } from '@hello-pangea/dnd';
import { type Task } from '@/entities/task';
import { filterTasksByGroup } from '../../lib/filter-tasks-by-group';
import { type TaskGroup } from '../../model/task-groups';
import { ListTask } from '../ListTask';
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
      <Droppable droppableId={group.value}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.tasks}
          >
            {filteredTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ListTask task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
