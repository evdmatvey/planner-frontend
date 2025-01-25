import { Link } from 'react-router';
import { routesConfig } from '@/shared/config/routes';
import { Color } from '@/shared/model/color.types';
import { TextedBadge } from '@/shared/ui/Badge';
import styles from './NotFound.module.css';

export const NotFound = () => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h1 className={styles.title}>Страница не найдена</h1>
          <p className={styles.desc}>Упс... Похоже что-то пошло не так</p>
        </div>
        <Link className={styles.link} to={routesConfig.HOME}>
          На главную
        </Link>
        <div className={styles.badge}>
          <TextedBadge text="404" color={Color.ORANGE} />
        </div>
      </div>
    </div>
  );
};
