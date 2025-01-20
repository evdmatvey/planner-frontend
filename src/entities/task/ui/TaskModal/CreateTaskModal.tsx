import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { SelectOrCreateTagPopup } from '@/entities/tag';
import { Button } from '@/shared/ui/Button';
import { DatePicker } from '@/shared/ui/DatePicker';
import { TransparentInput } from '@/shared/ui/TransparentInput';
import { CreateTaskDto } from '../../api/dto/create-task.dto';
import { useTaskModalStore } from '../../model/task-modal.store';
import { useCreateTask } from '../../model/useCreateTask';
import { useTaskMutation } from '../../model/useTaskMutation';
import { SelectTaskPriority } from '../SelectTaskPriority';
import styles from './TaskModal.module.css';

export const CreateTaskModal = () => {
  const { taskData, closeModal } = useTaskModalStore();

  const { control, register, reset, handleSubmit } = useForm<CreateTaskDto>({
    defaultValues: {
      tags: [],
      createdAt: taskData?.createdAt,
    },
  });

  const { createTask } = useCreateTask((data) => {
    reset();
    closeModal();
    if (data) toast.success(data?.message);
  });

  const { mutateTaskHandler } = useTaskMutation((dto) =>
    createTask(dto as CreateTaskDto),
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit(mutateTaskHandler)}>
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
        Создать
      </Button>
    </form>
  );
};
