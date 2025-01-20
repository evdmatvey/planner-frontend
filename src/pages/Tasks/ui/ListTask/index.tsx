import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { SelectOrCreateTagPopup } from '@/entities/tag';
import {
  CreateTaskDto,
  SelectTaskPriority,
  Task,
  useDeleteTask,
} from '@/entities/task';
import { DatePicker } from '@/shared/ui/DatePicker';
import { TransparentInput } from '@/shared/ui/TransparentInput';
import { DeleteIcon } from '@/shared/ui/icons/DeleteIcon';
import { MoveIcon } from '@/shared/ui/icons/MoveIcon';
import { useListTaskMutation } from '../../model/useListTaskMutation';
import styles from './ListTask.module.css';

interface ListTaskProps {
  task: Task;
}

export const ListTask = ({ task }: ListTaskProps) => {
  const { mutate } = useDeleteTask();
  const { register, control, watch } = useForm<CreateTaskDto>({
    defaultValues: {
      title: task.title,
      description: task.description,
      createdAt: task.createdAt,
      tags: task.tags,
      priority: task.priority,
    },
  });

  useListTaskMutation({ watch, itemId: task.id });

  return (
    <div className={styles.root}>
      <div className={styles.move}>
        <MoveIcon />
      </div>
      <div className={styles.content}>
        <div className={styles.cell}>
          <TransparentInput {...register('title')} />
        </div>
        <div className={styles.cell}>
          <TransparentInput {...register('description')} />
        </div>
        <div className={styles.cell}>
          <Controller
            control={control}
            name="createdAt"
            render={({ field: { value, onChange } }) => (
              <DatePicker
                date={dayjs(value).format('DD.MM.YYYY')}
                onChange={onChange}
              />
            )}
          />
        </div>
        <div className={styles.cell}>
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
        </div>
        <div className={styles.cell}>
          <Controller
            control={control}
            name="priority"
            render={({ field: { value, onChange } }) => (
              <SelectTaskPriority defaultPriority={value} onChange={onChange} />
            )}
          />
        </div>
      </div>
      <button className={styles.delete} onClick={() => mutate(task.id)}>
        <DeleteIcon />
      </button>
    </div>
  );
};
