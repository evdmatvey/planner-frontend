import { Draggable, Droppable } from '@hello-pangea/dnd';
import { type Task } from '@/entities/task';
import {
  filterTasksByGroup,
  getReferenceISODateByValue,
} from '../../lib/filter-tasks-by-group';
import { useTasksStore } from '../../model/store';
import { type TaskGroup } from '../../model/task-groups';
import { ListTask } from '../ListTask';
import styles from './ListRow.module.css';

interface ListRowProps {
  group: TaskGroup;
  tasks: Task[];
}

export const ListRow = ({ group, tasks }: ListRowProps) => {
  const { addTask } = useTasksStore();
  const filteredTasks = filterTasksByGroup(tasks, group.value);

  const addTaskHandler = () => {
    const referenceDate = getReferenceISODateByValue(group.value);

    addTask({
      id: '',
      title: '',
      createdAt: referenceDate,
      isCompleted: false,
      tags: [],
    });
  };

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
      <button className={styles.add} onClick={addTaskHandler}>
        Добавить задачу +
      </button>
    </div>
  );
};
