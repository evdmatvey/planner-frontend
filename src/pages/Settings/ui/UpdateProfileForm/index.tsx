import clsx from 'clsx';
import { useDashboardSidebarStore } from '@/widgets/dashboard-sidebar';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { useUpdateProfile } from '../../model/useUpdateProfile';
import { SettingsItemTitle } from '../SettingsItemTitle';
import styles from './UpdateProfileForm.module.css';

export const UpdateProfileForm = () => {
  const { isCollapsed } = useDashboardSidebarStore();
  const { errors, onSubmit, register } = useUpdateProfile();

  const classes = clsx(styles.form, {
    [styles.expanded]: isCollapsed,
  });

  return (
    <div className={styles.root}>
      <SettingsItemTitle text="Настройки профиля" />
      <form className={classes} onSubmit={onSubmit}>
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
          register={register('name', {
            required: 'Укажите имя!',
            minLength: {
              value: 4,
              message: 'Минимальная длина имени 4 символа!',
            },
            validate: {
              withoutSpaces: (name) => {
                if (name && !name.trim())
                  return 'Имя не может состоять только из пробелов!';
              },
            },
          })}
          placeholder="Имя"
          error={errors.name?.message}
        />
        <Input
          register={register('password', {
            minLength: {
              value: 6,
              message: 'Минимальная длина пароля 6 символов!',
            },
            validate: {
              withoutSpaces: (password) => {
                if (password && !password.trim())
                  return 'Пароль не может состоять только из пробелов!';
              },
            },
          })}
          type="password"
          placeholder="Пароль"
          error={errors.password?.message}
        />
        <Button>Обновить</Button>
      </form>
    </div>
  );
};
