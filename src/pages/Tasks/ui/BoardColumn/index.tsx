import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Task, TaskCard } from '@/entities/task';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import {
  filterTasksByGroup,
  referenceDateForValue,
} from '../../lib/filter-tasks-by-group';
import { TaskGroup } from '../../model/task-groups';
import { AddTaskModal } from '../AddTaskModal';
import styles from './BoardColumn.module.css';

interface BoardColumnProps {
  group: TaskGroup;
  tasks: Task[];
}

export const BoardColumn = ({ group, tasks }: BoardColumnProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredTasks = filterTasksByGroup(tasks, group.value);
  const referenceDate =
    group.value === 'completed'
      ? referenceDateForValue.today.toISOString()
      : referenceDateForValue[group.value].toISOString();

  const openAddModalHandler = () => setIsAddModalOpen(true);
  const closeAddModalHandler = () => setIsAddModalOpen(false);

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <h3>{group.label}</h3>
        {group.value !== 'completed' && (
          <button className={styles.add} onClick={openAddModalHandler}>
            <PlusIcon />
          </button>
        )}
        <AnimatePresence>
          {isAddModalOpen && (
            <AddTaskModal
              referenceDate={referenceDate}
              closeModalHandler={closeAddModalHandler}
            />
          )}
        </AnimatePresence>
      </div>
      <div className={styles.content}>
        <div className={styles.cards}>
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};
