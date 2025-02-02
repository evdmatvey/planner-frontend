import type { TagAnalytics, TasksInfoByGroups } from '@/entities/analytics';
import { TagBadge } from '@/entities/tag';
import { PopularTagGroup } from './PopularTagGroup';
import styles from './PopularTagsInfo.module.css';

interface PopularTag extends TagAnalytics {
  totalAnalytics: TasksInfoByGroups;
}

interface PopularTagInfoProps {
  popularTag: PopularTag;
}

export const PopularTagInfo = ({ popularTag }: PopularTagInfoProps) => {
  return (
    <div className={styles.tag}>
      <TagBadge tag={popularTag as Omit<PopularTag, 'tasks'>} />
      <PopularTagGroup
        title="Всего задач"
        tasksInfo={popularTag.totalAnalytics.all}
      />
      <PopularTagGroup
        title="Задач в процессе"
        tasksInfo={popularTag.totalAnalytics.todo}
      />
      <PopularTagGroup
        title="Выполнено задач"
        tasksInfo={popularTag.totalAnalytics.completed}
      />
    </div>
  );
};
