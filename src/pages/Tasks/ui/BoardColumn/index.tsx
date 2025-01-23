import { Draggable, Droppable } from '@hello-pangea/dnd';
import { DeleteTaskOption } from '@/features/delete-task';
import { ToggleCompleteTask } from '@/features/toggle-complete-task';
import { Task, TaskCard, useTaskModalStore } from '@/entities/task';
import { IconButton } from '@/shared/ui/IconButton';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import {
  filterTasksByGroup,
  getReferenceISODateByValue,
} from '../../lib/filter-tasks-by-group';
import { TaskGroup } from '../../model/task-groups';
import { GroupTitle } from '../GroupTitle';
import styles from './BoardColumn.module.css';

interface BoardColumnProps {
  group: TaskGroup;
  tasks: Task[];
}

export const BoardColumn = ({ group, tasks }: BoardColumnProps) => {
  const { openCreateModal, setTaskData } = useTaskModalStore();

  const filteredTasks = filterTasksByGroup(tasks, group.value);
  const referenceDate = getReferenceISODateByValue(group.value);

  const addTaskHandler = () => {
    openCreateModal();
    setTaskData({ createdAt: referenceDate });
  };

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <GroupTitle title={group.label} elementsCount={filteredTasks.length} />
        {group.value !== 'completed' && (
          <IconButton onClick={addTaskHandler} icon={<PlusIcon />} />
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
                      <TaskCard
                        key={task.id}
                        task={task}
                        optionsSlot={
                          <>
                            <ToggleCompleteTask task={task} />
                            <DeleteTaskOption id={task.id} />
                          </>
                        }
                      />
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
