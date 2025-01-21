import { useRef } from 'react';
import { type Tag } from '../../model/tag.types';
import { useTagsPopupState } from '../../model/useTagsPopupState';
import { TagBadge } from '../TagBudge';
import styles from './SelectOrCreateTagPopup.module.css';
import { TagsPopup } from './TagsPopup';

interface SelectOrCreateTagPopupProps {
  defaultTags: Tag[];
  withCreate?: boolean;
  onChange: (tags: Tag[]) => void;
}

export const SelectOrCreateTagPopup = ({
  defaultTags,
  withCreate,
  onChange,
}: SelectOrCreateTagPopupProps) => {
  const { selectedTags, addTagHandler, removeTagHandler } = useTagsPopupState(
    defaultTags,
    onChange,
  );
  const ref = useRef<HTMLDivElement>(null);

  const isTagsShow = selectedTags.length !== 0;

  return (
    <div className={styles.root} ref={ref}>
      <div className={styles.content}>
        {isTagsShow ? (
          <ul className={styles.tags}>
            {selectedTags.map((tag) => (
              <TagBadge
                key={tag.id}
                tag={tag}
                onClick={() => removeTagHandler(tag.id)}
              />
            ))}
          </ul>
        ) : (
          <div className={styles.title}>Выберите теги</div>
        )}
      </div>
      <TagsPopup
        ref={ref}
        addTagHandler={addTagHandler}
        withCreate={withCreate}
      />
    </div>
  );
};
