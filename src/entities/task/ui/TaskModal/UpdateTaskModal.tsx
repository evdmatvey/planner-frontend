import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { SelectOrCreateTagPopup } from '@/entities/tag';
import { Button } from '@/shared/ui/Button';
import { DatePicker } from '@/shared/ui/DatePicker';
import { TransparentInput } from '@/shared/ui/TransparentInput';
import { UpdateTaskDto } from '../../api/dto/update-task.dto';
import { useTaskModalStore } from '../../model/task-modal.store';
import { useUpdateTask } from '../../model/useUpdateTask';
import { SelectTaskPriority } from '../SelectTaskPriority';
import styles from './TaskModal.module.css';

export const UpdateTaskModal = () => {
  const { taskData, closeModal } = useTaskModalStore();

  const { control, register, reset, handleSubmit } = useForm<UpdateTaskDto>({
    defaultValues: {
      title: taskData?.title,
      priority: taskData?.priority,
      createdAt: taskData?.createdAt,
      description: taskData?.description,
      tags: taskData?.tags,
    },
  });

  const { updateTaskHandler } = useUpdateTask(taskData?.id ?? '', () => {
    reset();
    closeModal();
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(updateTaskHandler)}>
      <TransparentInput
        {...register('title')}
        variant="underscore"
        placeholder="Название"
      />
      <TransparentInput
        {...register('description')}
        variant="underscore"
        placeholder="Описание"
      />
      <Controller
        control={control}
        name="createdAt"
        render={({ field: { value, onChange } }) => (
          <DatePicker
            date={dayjs(value).format('DD.MM.YYYY') || ''}
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="tags"
        render={({ field: { value, onChange } }) => (
          <SelectOrCreateTagPopup
            defaultTags={value ?? []}
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="priority"
        render={({ field: { value, onChange } }) => (
          <SelectTaskPriority defaultPriority={value} onChange={onChange} />
        )}
      />
      <Button variant="bordered" size="small">
        Обновить
      </Button>
    </form>
  );
};
