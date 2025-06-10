import { Button } from '@/shared/ui/Button';
import { useLogout } from '../../model/useLogout';

interface LogoutUserProps {
  size?: 'small' | 'medium';
  className?: string;
  onLogout?: () => void;
}

export const LogoutUser = ({
  className,
  onLogout,
  size = 'small',
}: LogoutUserProps) => {
  const { logout } = useLogout();

  const logoutHandler = () => {
    if (onLogout) onLogout();
    logout();
  };

  return (
    <Button
      color="secondary"
      variant="bordered"
      size={size}
      className={className}
      onClick={logoutHandler}
    >
      Выйти
    </Button>
  );
};
