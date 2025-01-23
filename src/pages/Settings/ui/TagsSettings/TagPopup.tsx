import { useRef } from 'react';
import { type Tag, TagBadge } from '@/entities/tag';
import { usePopup } from '@/shared/lib/usePopup';
import { AnimatedPopup } from '@/shared/ui/AnimatedPopup';
import { Button } from '@/shared/ui/Button';
import { useDeleteTag } from '../../model/useDeleteTag';
import styles from './TagsSettings.module.css';

interface TagsSettingsItemProps {
  tag: Tag;
}

export const TagsSettingsItem = ({ tag }: TagsSettingsItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, togglePopupHandler } = usePopup(ref);
  const { deleteTag } = useDeleteTag();

  return (
    <div ref={ref} className={styles.tag} onClick={() => togglePopupHandler()}>
      <TagBadge tag={tag} />
      <AnimatedPopup isOpen={isOpen} className={styles.popup}>
        <Button
          variant="bordered"
          color="primary"
          size="small"
          onClick={() => deleteTag(tag.id)}
        >
          Удалить
        </Button>
        <Button variant="bordered" color="secondary" size="small">
          Отмена
        </Button>
      </AnimatedPopup>
    </div>
  );
};
