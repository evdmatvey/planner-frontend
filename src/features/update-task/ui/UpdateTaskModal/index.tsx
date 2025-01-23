import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { SelectPriority } from '@/entities/priority';
import { SelectTagPopup } from '@/entities/tag';
import {
  type UpdateTaskDto,
  useTaskModalStore,
  useTaskMutation,
} from '@/entities/task';
import { Button } from '@/shared/ui/Button';
import { DatePicker } from '@/shared/ui/DatePicker';
import { TransparentInput } from '@/shared/ui/TransparentInput';
import { useUpdateTask } from '../../model/useUpdateTask';
import styles from './UpdateTaskModal.module.css';

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

  const { updateTask } = useUpdateTask((data) => {
    reset();
    closeModal();
    if (data) toast.success(data?.message);
  });

  const { mutateTaskHandler } = useTaskMutation((dto) =>
    updateTask({ id: taskData?.id as string, dto }),
  );

  return (
    <form className={styles.root} onSubmit={handleSubmit(mutateTaskHandler)}>
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
          <SelectTagPopup defaultTags={value ?? []} onChange={onChange} />
        )}
      />
      <Controller
        control={control}
        name="priority"
        render={({ field: { value, onChange } }) => (
          <SelectPriority defaultPriority={value} onChange={onChange} />
        )}
      />
      <Button variant="bordered" size="small">
        Обновить
      </Button>
    </form>
  );
};
