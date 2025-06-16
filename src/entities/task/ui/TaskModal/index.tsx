import { AnimatePresence, m } from 'framer-motion';
import { type ReactNode } from 'react';
import { brakepointsConfig } from '@/shared/config/brakepoints';
import { getVw } from '@/shared/lib/get-vw';
import { IconButton } from '@/shared/ui/IconButton';
import { CloseIcon } from '@/shared/ui/icons/CloseIcon';
import { useTaskModalStore } from '../../model/task-modal.store';
import styles from './TaskModal.module.css';

interface TaskModalProps {
  updateModal: ReactNode;
  createModal: ReactNode;
}

export const TaskModal = ({ updateModal, createModal }: TaskModalProps) => {
  const { modalVariant, isModalOpen, closeModal } = useTaskModalStore();
  const isCreateTaskModal = modalVariant === 'create';

  const isMobile = getVw() < brakepointsConfig.mobile;

  return (
    <AnimatePresence>
      {isModalOpen && (
        <m.div
          className={styles.root}
          initial={{ width: 200, opacity: 0 }}
          animate={{ width: isMobile ? 340 : 450, opacity: 1 }}
          exit={{ width: 200, opacity: 0 }}
        >
          <IconButton
            className={styles.close}
            onClick={closeModal}
            icon={<CloseIcon />}
          />
          <h3 className={styles.title}>
            {isCreateTaskModal ? 'Создание задачи' : 'Обновление задачи'}
          </h3>
          {isCreateTaskModal ? createModal : updateModal}
        </m.div>
      )}
    </AnimatePresence>
  );
};
