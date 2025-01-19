import { useQuery } from '@tanstack/react-query';
import { type RefObject, forwardRef } from 'react';
import { usePopup } from '@/shared/lib/usePopup';
import { AnimatedPopup } from '@/shared/ui/AnimatedPopup';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { tagQueries } from '../../api/tag.queries';
import { type Tag } from '../../model/tag.types';
import { TagBadge } from '../TagBudge';
import styles from './SelectOrCreateTagPopup.module.css';

interface TagsPopupProps {
  addTagHandler: (tag: Tag) => void;
}

export const TagsPopup = forwardRef<HTMLElement, TagsPopupProps>(
  ({ addTagHandler }: TagsPopupProps, ref) => {
    const { data: tags } = useQuery(tagQueries.list());
    const { isOpen, togglePopupHandler } = usePopup(
      ref as RefObject<HTMLElement>,
    );

    return (
      <>
        <button
          type="button"
          className={styles.add_button}
          onClick={togglePopupHandler}
        >
          <PlusIcon />
        </button>
        <AnimatedPopup isOpen={isOpen} className={styles.popup}>
          {tags?.map((tag) => (
            <TagBadge
              key={tag.id}
              tag={tag}
              onClick={() => addTagHandler(tag)}
            />
          ))}
        </AnimatedPopup>
      </>
    );
  },
);
