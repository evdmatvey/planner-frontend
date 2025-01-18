import { AnimatePresence, m } from 'framer-motion';
import { CloseIcon } from '@/shared/ui/icons/CloseIcon';
import { useTaskModalStore } from '../../model/task-modal.store';
import { CreateTaskModal } from './CreateTaskModal';
import styles from './TaskModal.module.css';

export const TaskModal = () => {
  const { modalVariant, isModalOpen, closeModal } = useTaskModalStore();
  const isCreateTaskModal = modalVariant === 'create';

  return (
    <AnimatePresence>
      {isModalOpen && (
        <m.div
          className={styles.root}
          initial={{ width: 200, opacity: 0 }}
          animate={{ width: 450, opacity: 1 }}
          exit={{ width: 200, opacity: 0 }}
        >
          <button className={styles.close} onClick={closeModal}>
            <CloseIcon />
          </button>
          <h3 className={styles.title}>
            {isCreateTaskModal ? 'Создание задачи' : 'Обновление задачи'}
          </h3>
          {isCreateTaskModal && <CreateTaskModal />}
        </m.div>
      )}
    </AnimatePresence>
  );
};
