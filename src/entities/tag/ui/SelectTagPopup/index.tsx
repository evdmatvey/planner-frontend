import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { usePopup } from '@/shared/lib/usePopup';
import { AnimatedPopup } from '@/shared/ui/AnimatedPopup';
import { IconButton } from '@/shared/ui/IconButton';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { tagQueries } from '../../api/tag.queries';
import { type Tag } from '../../model/tag.types';
import { useTagsPopupState } from '../../model/useTagsPopupState';
import { TagList } from '../TagList';
import styles from './SelectTagPopup.module.css';

interface SelectTagPopupProps {
  defaultTags: Tag[];
  onChange: (tags: Tag[]) => void;
}

export const SelectTagPopup = ({
  defaultTags,
  onChange,
}: SelectTagPopupProps) => {
  const { selectedTags, addTagHandler, removeTagHandler } = useTagsPopupState(
    defaultTags,
    onChange,
  );
  const ref = useRef<HTMLDivElement>(null);
  const { data: tags } = useQuery(tagQueries.list());
  const { isOpen, togglePopupHandler } = usePopup(ref);

  const isTagsShow = selectedTags.length !== 0;

  const removeTag = (tag: Tag) => removeTagHandler(tag.id);

  return (
    <div className={styles.root} ref={ref}>
      <div className={styles.content}>
        {isTagsShow ? (
          <TagList tags={selectedTags} onTagClick={removeTag} />
        ) : (
          <div className={styles.title}>Выберите теги</div>
        )}
      </div>
      <IconButton
        type="button"
        onClick={togglePopupHandler}
        icon={<PlusIcon />}
      />
      <AnimatedPopup isOpen={isOpen} className={styles.popup}>
        <TagList tags={tags ?? []} onTagClick={addTagHandler} />
      </AnimatedPopup>
    </div>
  );
};
