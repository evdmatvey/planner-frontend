import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { authService } from '@/entities/auth';
import { routesConfig } from '@/shared/config/routes';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { toastifyError } from '@/shared/lib/toastify-error';

export const useLogout = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onError: (error) => {
      toastifyError(getErrorMessage(error));
      navigate(routesConfig.LOGIN);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate(routesConfig.LOGIN);
    },
  });

  return { mutate };
};
