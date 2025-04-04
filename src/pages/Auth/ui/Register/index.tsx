import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import Turnstile from 'react-turnstile';
import { RegisterDto, authService } from '@/entities/auth';
import { routesConfig } from '@/shared/config/routes';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { toastifyError } from '@/shared/lib/toastify-error';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { AuthLayout } from '../AuthLayout';

export const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<RegisterDto>({ mode: 'onChange' });
  const navigate = useNavigate();
  const [captchaToken, setCaptchaToken] = useState('');
  const isButtonDisabled = import.meta.env.DEV ? false : !captchaToken;

  const handleVerify = (token: string) => {
    setCaptchaToken(token);
  };

  const resetCaptcha = () => {
    setCaptchaToken('');
  };

  const loginHandler = async (dto: RegisterDto) => {
    try {
      const { message } = await authService.register({
        ...dto,
      });

      toast.success(message);
      reset();
      navigate(routesConfig.TASKS);
    } catch (error) {
      toastifyError(getErrorMessage(error));
    } finally {
      resetCaptcha();
    }
  };

  return (
    <AuthLayout>
      <AuthLayout.Title>Регистрация</AuthLayout.Title>
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
        <Input
          register={register('passwordRepeat', {
            required: 'Повторите пароль!',
            minLength: {
              value: 6,
              message: 'Минимальная длина пароля 6 символов!',
            },
            validate: {
              withoutSpaces: (password) => {
                if (!password.trim())
                  return 'Пароль не может состоять только из пробелов!';
              },
              matchesPreviousPassword: (value) => {
                const { password } = getValues();
                return password === value || 'Пароли не совпадают';
              },
            },
          })}
          type="password"
          placeholder="Повторите пароль"
          error={errors.passwordRepeat?.message}
        />
        {!import.meta.env.DEV && (
          <Turnstile
            sitekey={import.meta.env.VITE_SITE_KEY}
            onVerify={handleVerify}
            theme="dark"
          />
        )}
        <Button disabled={isButtonDisabled}>Зарегистрироваться</Button>
      </AuthLayout.Form>
      <AuthLayout.Caption>
        Уже есть аккаунт?&nbsp;
        <Link to={routesConfig.LOGIN}>Войти</Link>...
      </AuthLayout.Caption>
    </AuthLayout>
  );
};
