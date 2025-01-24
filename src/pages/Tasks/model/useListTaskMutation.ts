import debounce from 'lodash.debounce';
import { useCallback, useEffect } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { useCreateTask } from '@/features/create-task';
import { useUpdateTask } from '@/features/update-task';
import { type Tag } from '@/entities/tag';
import { type CreateTaskDto } from '@/entities/task';
import { cleanDto } from '@/shared/lib/clean-dto';

interface ListTaskMutationArguments {
  watch: UseFormWatch<CreateTaskDto>;
  itemId: string;
}

export const useListTaskMutation = ({
  watch,
  itemId,
}: ListTaskMutationArguments) => {
  const { createTask } = useCreateTask();
  const { updateTask } = useUpdateTask();

  const debouncedCreateTask = useCallback(
    debounce((dto: CreateTaskDto) => {
      createTask(dto);
    }, 1000),
    [],
  );

  const debouncedUpdateTask = useCallback(
    debounce((dto: CreateTaskDto) => {
      updateTask({ id: itemId, dto });
    }, 1000),
    [],
  );

  useEffect(() => {
    const { unsubscribe } = watch((dto) => {
      const transformedDto = cleanDto({
        ...dto,
        title: dto.title ?? '',
        tags: (dto.tags as Tag[]) ?? [],
      }) as CreateTaskDto;

      if (itemId) {
        debouncedUpdateTask(transformedDto);
      } else {
        debouncedCreateTask(transformedDto);
      }
    });

    return () => unsubscribe();
  }, [watch(), debouncedUpdateTask, debouncedCreateTask]);
};
