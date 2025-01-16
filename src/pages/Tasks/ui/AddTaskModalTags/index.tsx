import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { Tag, TagBadge, tagQueries } from '@/entities/tag';
import { usePopup } from '@/shared/lib/usePopup';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import styles from './AddTaskModalTags.module.css';

interface AddTaskModalTagsProps {
  defaultTags: Tag[];
  onChange: (tags: Tag[]) => void;
}

export const AddTaskModalTags = ({
  defaultTags,
  onChange,
}: AddTaskModalTagsProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(defaultTags);
  const { data: tags } = useQuery(tagQueries.list());
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, togglePopupHandler } = usePopup(ref);

  const addTagHandler = (tag: Tag) => {
    if (selectedTags.some((t) => t.id === tag.id)) return;

    const newTags = [...selectedTags, tag];

    setSelectedTags(newTags);
    onChange(newTags);
  };

  const removeTagHandler = (tagId: string) => {
    const newTags = selectedTags.filter((tag) => tag.id !== tagId);

    setSelectedTags(newTags);
    onChange(newTags);
  };

  return (
    <div className={styles.root}>
      <div className={styles.heading} ref={ref}>
        <div className={styles.content}>
          {selectedTags.length !== 0 ? (
            <ul className={styles.tags}>
              {selectedTags.map((tag) => (
                <div
                  key={tag.id}
                  className={styles.selected_tag}
                  onClick={() => removeTagHandler(tag.id)}
                >
                  <TagBadge tag={tag} />
                </div>
              ))}
            </ul>
          ) : (
            <div className={styles.title}>Выберите теги</div>
          )}
        </div>
        <button
          type="button"
          className={styles.add_button}
          onClick={togglePopupHandler}
        >
          <PlusIcon />
        </button>
        {isOpen && (
          <div className={styles.popup}>
            {tags?.map((tag) => (
              <div
                key={tag.id}
                className={styles.tag}
                onClick={() => addTagHandler(tag)}
              >
                <TagBadge tag={tag} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
