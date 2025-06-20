import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { useDeleteTask } from '@/features/delete-task';
import { ExecutionTimeInput } from '@/entities/execution-time';
import { SelectPriority } from '@/entities/priority';
import { SelectTagPopup } from '@/entities/tag';
import { type CreateTaskDto, type Task } from '@/entities/task';
import { DatePicker } from '@/shared/ui/DatePicker';
import { IconButton } from '@/shared/ui/IconButton';
import { TransparentInput } from '@/shared/ui/TransparentInput';
import { DeleteIcon } from '@/shared/ui/icons/DeleteIcon';
import { MoveIcon } from '@/shared/ui/icons/MoveIcon';
import { useListTaskMutation } from '../../model/useListTaskMutation';
import styles from './ListTask.module.css';

interface ListTaskProps {
  task: Task;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
}

export const ListTask = ({ task, dragHandleProps }: ListTaskProps) => {
  const { deleteTask } = useDeleteTask();
  const classes = clsx(styles.root, {
    [styles.completed]: task.isCompleted,
  });

  const { register, control, watch } = useForm<CreateTaskDto>({
    defaultValues: {
      title: task.title,
      description: task.description,
      createdAt: task.createdAt,
      tags: task.tags,
      priority: task.priority,
      executionTime: task.executionTime,
    },
  });

  useListTaskMutation({ watch, itemId: task.id });

  return (
    <div className={classes}>
      <div {...dragHandleProps}>
        <IconButton className={styles.move} icon={<MoveIcon />} />
      </div>
      <div className={styles.content}>
        <div className={styles.cell}>
          <TransparentInput placeholder="Название" {...register('title')} />
        </div>
        <div className={styles.cell}>
          <TransparentInput
            placeholder="Описание"
            {...register('description')}
          />
        </div>
        <div className={styles.cell}>
          <Controller
            control={control}
            name="executionTime"
            render={({ field: { value, onChange } }) => (
              <ExecutionTimeInput
                onChange={onChange}
                defaultExecutionTime={value}
              />
            )}
          />
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
              <SelectTagPopup defaultTags={value ?? []} onChange={onChange} />
            )}
          />
        </div>
        <div className={styles.cell}>
          <Controller
            control={control}
            name="priority"
            render={({ field: { value, onChange } }) => (
              <SelectPriority defaultPriority={value} onChange={onChange} />
            )}
          />
        </div>
      </div>
      <IconButton
        className={styles.delete}
        onClick={() => deleteTask(task.id)}
        icon={<DeleteIcon />}
      />
    </div>
  );
};
