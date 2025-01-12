import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  type UpdateProfileDto,
  useGetProfile,
  userQueries,
} from '@/entities/user';
import { userService } from '@/entities/user/api/user.service';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { toastifyError } from '@/shared/lib/toastify-error';

export const useUpdateProfile = () => {
  const { data, isSuccess } = useGetProfile();
  const queryClient = useQueryClient();
  const {
    formState: { errors },
    reset,
    register,
    handleSubmit,
  } = useForm<UpdateProfileDto>({ mode: 'onChange' });

  const resetData: UpdateProfileDto = {
    email: data?.email ?? '',
    name: data?.name ?? '',
    password: '',
  };

  const { mutate } = useMutation({
    mutationKey: ['profile'],
    mutationFn: (dto: UpdateProfileDto) => userService.updateProfile(dto),
    onError: (error) => toastifyError(getErrorMessage(error)),
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: userQueries.profiles() });
      toast.success(data.message);
    },
  });

  const updateProfileHandler = async (dto: UpdateProfileDto) => {
    let transformedDto = dto;

    if (!dto.password)
      transformedDto = {
        email: dto.email,
        name: dto.name,
      };

    mutate(transformedDto);
    reset(resetData);
  };

  const onSubmit = handleSubmit(updateProfileHandler);

  useEffect(() => {
    if (isSuccess && data) reset(resetData);
  }, [isSuccess, data]);

  return {
    onSubmit,
    register,
    errors,
  };
};
