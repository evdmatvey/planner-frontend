import { Draggable, Droppable } from '@hello-pangea/dnd';
import { AddTaskButton } from '@/features/create-task';
import { DeleteTaskOption } from '@/features/delete-task';
import { ToggleCompleteTask } from '@/features/toggle-complete-task';
import { UpdateTaskOption } from '@/features/update-task';
import { type Task, TaskCard } from '@/entities/task';
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
  const filteredTasks = filterTasksByGroup(tasks, group.value);
  const referenceDate = getReferenceISODateByValue(group.value);

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <GroupTitle title={group.label} tasks={filteredTasks} />
        {group.value !== 'completed' && (
          <AddTaskButton referenceDate={referenceDate} />
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
                            <UpdateTaskOption task={task} />
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
