import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { toastifyError } from '@/shared/lib/toastify-error';
import { type CreateTagDto } from '../api/dto/create-tag.dto';
import { tagQueries } from '../api/tag.queries';
import { tagService } from '../api/tag.service';

export const useCreateTag = () => {
  const queryClient = useQueryClient();

  const { mutate: createTag } = useMutation({
    mutationKey: ['tag', 'create'],
    mutationFn: (dto: CreateTagDto) => tagService.create(dto),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: tagQueries.lists() });
    },
    onError: (error) => toastifyError(getErrorMessage(error)),
  });

  return { createTag };
};
