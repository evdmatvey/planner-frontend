import { useQuery } from '@tanstack/react-query';
import { tagQueries } from '@/entities/tag';
import { SettingsItemTitle } from '../SettingsItemTitle';
import { TagsSettingsItem } from './TagPopup';
import styles from './TagsSettings.module.css';

export const TagsSettings = () => {
  const { data: tags } = useQuery(tagQueries.list());

  return (
    <div className={styles.root}>
      <SettingsItemTitle text="Управление тегами" />
      <div className={styles.tags}>
        {tags?.map((tag) => <TagsSettingsItem key={tag.id} tag={tag} />)}
      </div>
    </div>
  );
};
