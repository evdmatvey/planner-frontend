import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { CreateTagForm } from '@/features/create-tag';
import { tagQueries } from '@/entities/tag';
import { usePopup } from '@/shared/lib/usePopup';
import { AnimatedPopup } from '@/shared/ui/AnimatedPopup';
import { IconButton } from '@/shared/ui/IconButton';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { SettingsItemTitle } from '../SettingsItemTitle';
import { TagsSettingsItem } from './TagPopup';
import styles from './TagsSettings.module.css';

export const TagsSettings = () => {
  const { data: tags } = useQuery(tagQueries.list());
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, togglePopupHandler } = usePopup(ref);

  return (
    <div className={styles.root}>
      <div className={styles.heading} ref={ref}>
        <SettingsItemTitle text="Управление тегами" />
        <IconButton onClick={togglePopupHandler} icon={<PlusIcon />} />
        <AnimatedPopup isOpen={isOpen} className={styles.create}>
          <CreateTagForm createCallback={togglePopupHandler} />
        </AnimatedPopup>
      </div>
      <div className={styles.tags}>
        {tags?.map((tag) => <TagsSettingsItem key={tag.id} tag={tag} />)}
      </div>
    </div>
  );
};
