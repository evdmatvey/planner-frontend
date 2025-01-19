import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Task, TaskCard, useTaskModalStore } from '@/entities/task';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import {
  filterTasksByGroup,
  referenceDateForValue,
} from '../../lib/filter-tasks-by-group';
import { TaskGroup } from '../../model/task-groups';
import styles from './BoardColumn.module.css';

interface BoardColumnProps {
  group: TaskGroup;
  tasks: Task[];
}

export const BoardColumn = ({ group, tasks }: BoardColumnProps) => {
  const { openCreateModal, setTaskData } = useTaskModalStore();

  const filteredTasks = filterTasksByGroup(tasks, group.value);
  const referenceDate =
    group.value === 'completed'
      ? referenceDateForValue.today.toISOString()
      : referenceDateForValue[group.value].toISOString();

  const addTaskHandler = () => {
    openCreateModal();
    setTaskData({ createdAt: referenceDate });
  };

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <h3>{group.label}</h3>
        {group.value !== 'completed' && (
          <button className={styles.add} onClick={addTaskHandler}>
            <PlusIcon />
          </button>
        )}
      </div>
      <Droppable droppableId={group.value}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.content}
          >
            <div className={styles.cards}>
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskCard key={task.id} task={task} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};
