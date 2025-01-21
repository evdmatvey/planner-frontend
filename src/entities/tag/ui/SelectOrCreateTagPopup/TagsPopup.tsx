import { useQuery } from '@tanstack/react-query';
import { type RefObject, forwardRef, useState } from 'react';
import { usePopup } from '@/shared/lib/usePopup';
import { AnimatedPopup } from '@/shared/ui/AnimatedPopup';
import { IconButton } from '@/shared/ui/IconButton';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { tagQueries } from '../../api/tag.queries';
import { type Tag } from '../../model/tag.types';
import { CreateTagForm } from '../CreateTagForm';
import { TagBadge } from '../TagBudge';
import styles from './SelectOrCreateTagPopup.module.css';

interface TagsPopupProps {
  withCreate?: boolean;
  addTagHandler: (tag: Tag) => void;
}

export const TagsPopup = forwardRef<HTMLElement, TagsPopupProps>(
  ({ withCreate, addTagHandler }: TagsPopupProps, ref) => {
    const { data: tags } = useQuery(tagQueries.list());
    const [isCreateFormOpen, setCreateFormOpen] = useState(false);
    const { isOpen, togglePopupHandler } = usePopup(
      ref as RefObject<HTMLElement>,
    );

    return (
      <>
        <IconButton
          type="button"
          onClick={togglePopupHandler}
          icon={<PlusIcon />}
        />
        <AnimatedPopup isOpen={isOpen} className={styles.popup}>
          {tags?.map((tag) => (
            <TagBadge
              key={tag.id}
              tag={tag}
              onClick={() => addTagHandler(tag)}
            />
          ))}
          {withCreate && (
            <>
              <IconButton
                type="button"
                onClick={() => setCreateFormOpen((prev) => !prev)}
                icon={<PlusIcon />}
              />
              {isCreateFormOpen && (
                <CreateTagForm
                  createCallback={() => setCreateFormOpen(false)}
                />
              )}
            </>
          )}
        </AnimatedPopup>
      </>
    );
  },
);
