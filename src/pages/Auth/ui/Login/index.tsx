import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { LoginDto, authService } from '@/entities/auth';
import { routesConfig } from '@/shared/config/routes';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { toastifyError } from '@/shared/lib/toastify-error';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { AuthLayout } from '../AuthLayout';

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginDto>({ mode: 'onChange' });
  const navigate = useNavigate();

  const loginHandler = async (dto: LoginDto) => {
    try {
      const { message } = await authService.login({
        ...dto,
      });

      toast.success(message);
      reset();
      navigate(routesConfig.TASKS);
    } catch (error) {
      toastifyError(getErrorMessage(error));
    }
  };

  return (
    <AuthLayout>
      <AuthLayout.Title>Авторизация</AuthLayout.Title>
      <AuthLayout.Form onSubmit={handleSubmit(loginHandler)}>
        <Input
          register={register('email', {
            required: 'Укажите email!',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Укажите корректный email!',
            },
          })}
          placeholder="Email"
          error={errors.email?.message}
        />
        <Input
          register={register('password', {
            required: 'Укажите пароль!',
            minLength: {
              value: 6,
              message: 'Минимальная длина пароля 6 символов!',
            },
            validate: {
              withoutSpaces: (password) => {
                if (!password.trim())
                  return 'Пароль не может состоять только из пробелов!';
              },
            },
          })}
          type="password"
          placeholder="Пароль"
          error={errors.password?.message}
        />
        <Button>Войти</Button>
      </AuthLayout.Form>
      <AuthLayout.Caption>
        Ещё нет аккаунта?&nbsp;
        <Link to={routesConfig.REGISTER}>Зарегистрироваться</Link>...
      </AuthLayout.Caption>
    </AuthLayout>
  );
};
