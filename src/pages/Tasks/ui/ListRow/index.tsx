import { Draggable, Droppable } from '@hello-pangea/dnd';
import { type Task } from '@/entities/task';
import {
  filterTasksByGroup,
  getReferenceISODateByValue,
} from '../../lib/filter-tasks-by-group';
import { useTasksStore } from '../../model/store';
import { type TaskGroup } from '../../model/task-groups';
import { GroupTitle } from '../GroupTitle';
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
      <GroupTitle title={group.label} tasks={filteredTasks} />
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
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <ListTask
                      task={task}
                      dragHandleProps={provided.dragHandleProps}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {group.value !== 'completed' && (
        <button className={styles.add} onClick={addTaskHandler}>
          Добавить задачу +
        </button>
      )}
    </div>
  );
};
