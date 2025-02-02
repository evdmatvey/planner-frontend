import { type TagAnalytics } from '@/entities/analytics';
import { reduceTasksInfoGroups } from '../../lib/reduce-tasks-info-groups';
import { PopularTagInfo } from './PopularTagInfo';
import styles from './PopularTagsInfo.module.css';

interface PopularTagsProps {
  tagsAnalytics: TagAnalytics[];
  popularTagsCount?: number;
}

export const PopularTagsInfo = ({
  tagsAnalytics,
  popularTagsCount = 3,
}: PopularTagsProps) => {
  const popularTagsAnalytics = tagsAnalytics
    ?.map((ta) => ({ ...ta, totalAnalytics: reduceTasksInfoGroups(ta.tasks) }))
    ?.sort((a, b) => b.totalAnalytics.all.count - a.totalAnalytics.all.count)
    .slice(0, popularTagsCount);

  return (
    <div className={styles.root}>
      {popularTagsAnalytics?.map((tag) => (
        <PopularTagInfo key={tag.id} popularTag={tag} />
      ))}
    </div>
  );
};
