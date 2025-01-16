import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, m } from 'framer-motion';
import { type RefObject, forwardRef } from 'react';
import { usePopup } from '@/shared/lib/usePopup';
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
        <AnimatePresence>
          {isOpen && (
            <m.div
              className={styles.popup}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
            >
              {tags?.map((tag) => (
                <TagBadge
                  key={tag.id}
                  tag={tag}
                  onClick={() => addTagHandler(tag)}
                />
              ))}
            </m.div>
          )}
        </AnimatePresence>
      </>
    );
  },
);
