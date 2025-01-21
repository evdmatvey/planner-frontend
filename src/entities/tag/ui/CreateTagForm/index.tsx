import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/shared/ui/Button';
import { TransparentInput } from '@/shared/ui/TransparentInput';
import { type CreateTagDto } from '../../api/dto/create-tag.dto';
import { useCreateTag } from '../../model/useCreateTag';
import { SelectTagColor } from '../SelectTagColor';
import styles from './CreateTagForm.module.css';

interface CreateTagFormProps {
  createCallback?: () => void;
}

export const CreateTagForm = ({ createCallback }: CreateTagFormProps) => {
  const { control, register, handleSubmit, reset } = useForm<CreateTagDto>();
  const { createTag } = useCreateTag();

  const createTagHandler = (dto: CreateTagDto) => {
    createTag(dto);
    reset();
    if (createCallback) createCallback();
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit(createTagHandler)}>
      <TransparentInput
        {...register('title')}
        placeholder="Название"
        variant="underscore"
      />
      <Controller
        control={control}
        name="color"
        render={({ field: { value, onChange } }) => (
          <SelectTagColor defaultValue={value} onChange={onChange} />
        )}
      />
      <Button type="submit" variant="bordered" size="small">
        Создать
      </Button>
    </form>
  );
};
