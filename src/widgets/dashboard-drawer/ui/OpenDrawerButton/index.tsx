import { IconButton } from '@/shared/ui/IconButton';
import { BurgerMenuIcon } from '@/shared/ui/icons/BurgerMenuIcon';
import styles from './OpenDrawerButton.module.css';

interface OpenDrawerButtonProps {
  openDrawerHandler: () => void;
}

export const OpenDrawerButton = ({
  openDrawerHandler,
}: OpenDrawerButtonProps) => {
  return (
    <IconButton
      className={styles.root}
      icon={<BurgerMenuIcon />}
      onClick={openDrawerHandler}
    />
  );
};
