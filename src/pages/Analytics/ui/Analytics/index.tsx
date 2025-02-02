import { useQuery } from '@tanstack/react-query';
import { analyticsQueries } from '@/entities/analytics';
import { ActivityCalendar } from '../ActivityCalendar';
import { PopularTagsInfo } from '../PopularTagsInfo';
import { TagsPieChart } from '../TagsPieChart';
import styles from './Analytics.module.css';

export const Analytics = () => {
  const { data: tagsAnalytics, isLoading } = useQuery(analyticsQueries.tag());
  const tagsNotFound = !isLoading && !tagsAnalytics?.length;

  return (
    <div className={styles.root}>
      <div className={styles.analytic}>
        <h3 className={styles.heading}>Выполненные задачи</h3>
        <ActivityCalendar />
      </div>

      <div className={styles.analytic}>
        <h3 className={styles.heading}>Теги</h3>
        {tagsAnalytics?.length && (
          <div className={styles.row}>
            <TagsPieChart tagsAnalytics={tagsAnalytics} />
            <PopularTagsInfo tagsAnalytics={tagsAnalytics} />
          </div>
        )}
        {isLoading && <div className={styles.loader}></div>}
        {tagsNotFound && (
          <div className={styles.notfound}>
            Упс.. у вас пока нет тегов. Создайте тег, прикрепите его к задача,
            после этого вы сможете получите аналитику тегов
          </div>
        )}
      </div>
    </div>
  );
};
