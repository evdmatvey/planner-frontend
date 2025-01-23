import { useTaskModalStore } from '@/entities/task';
import { IconButton } from '@/shared/ui/IconButton';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';

interface AddTaskButtonProps {
  referenceDate: string;
}

export const AddTaskButton = ({ referenceDate }: AddTaskButtonProps) => {
  const { openCreateModal, setTaskData } = useTaskModalStore();

  const addTaskHandler = () => {
    openCreateModal();
    setTaskData({ createdAt: referenceDate });
  };

  return <IconButton onClick={addTaskHandler} icon={<PlusIcon />} />;
};
