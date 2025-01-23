import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { tagQueries, tagService } from '@/entities/tag';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { toastifyError } from '@/shared/lib/toastify-error';

export const useDeleteTag = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTag } = useMutation({
    mutationKey: ['tag', 'delete'],
    mutationFn: (tagId: string) => tagService.delete(tagId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.refetchQueries({ queryKey: tagQueries.lists() });
    },
    onError: (error) => toastifyError(getErrorMessage(error)),
  });

  return { deleteTag };
};
