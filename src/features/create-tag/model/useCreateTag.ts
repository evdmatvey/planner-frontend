import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CreateTagDto, tagQueries, tagService } from '@/entities/tag';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { toastifyError } from '@/shared/lib/toastify-error';

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
