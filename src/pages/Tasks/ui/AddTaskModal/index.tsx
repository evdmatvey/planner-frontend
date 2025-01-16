import dayjs from 'dayjs';
import { m } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import { CreateTaskDto } from '@/entities/task';
import { Button } from '@/shared/ui/Button';
import { DatePicker } from '@/shared/ui/DatePicker';
import { TransparentInput } from '@/shared/ui/TransparentInput';
import { CloseIcon } from '@/shared/ui/icons/CloseIcon';
import { AddTaskModalTags } from '../AddTaskModalTags';
import styles from './AddTaskModal.module.css';

interface AddTaskModalProps {
  closeModalHandler: () => void;
  referenceDate: string;
}

export const AddTaskModal = ({
  referenceDate,
  closeModalHandler,
}: AddTaskModalProps) => {
  const { control, register, handleSubmit } = useForm<CreateTaskDto>({
    defaultValues: {
      tags: [],
      createdAt: referenceDate,
    },
  });

  const createTaskHandler = (dto: CreateTaskDto) => {
    console.log(dto);
  };

  return (
    <m.div
      className={styles.root}
      initial={{ width: 200, opacity: 0 }}
      animate={{ width: 450, opacity: 1 }}
      exit={{ width: 200, opacity: 0 }}
    >
      <button className={styles.close} onClick={closeModalHandler}>
        <CloseIcon />
      </button>
      <h3 className={styles.title}>Создание задачи</h3>
      <form className={styles.form} onSubmit={handleSubmit(createTaskHandler)}>
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
            <AddTaskModalTags defaultTags={value ?? []} onChange={onChange} />
          )}
        />
        <Button variant="bordered" size="small">
          Создать
        </Button>
      </form>
    </m.div>
  );
};
