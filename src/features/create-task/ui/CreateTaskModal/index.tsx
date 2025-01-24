import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ExecutionTimeInput } from '@/entities/execution-time';
import { SelectPriority } from '@/entities/priority/@x/task';
import { SelectTagPopup } from '@/entities/tag/@x/task';
import {
  type CreateTaskDto,
  useTaskModalStore,
  useTaskMutation,
} from '@/entities/task';
import { Button } from '@/shared/ui/Button';
import { DatePicker } from '@/shared/ui/DatePicker';
import { TransparentInput } from '@/shared/ui/TransparentInput';
import { useCreateTask } from '../../model/useCreateTask';
import styles from './CreateTaskModal.module.css';

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
        name="executionTime"
        render={({ field: { value, onChange } }) => (
          <ExecutionTimeInput
            variant="underscore"
            onChange={onChange}
            defaultExecutionTime={value}
          />
        )}
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
        Создать
      </Button>
    </form>
  );
};
