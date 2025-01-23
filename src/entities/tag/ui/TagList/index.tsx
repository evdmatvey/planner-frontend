import clsx from 'clsx';
import { type Tag } from '../../model/tag.types';
import { TagBadge } from '../TagBudge';
import styles from './TagList.module.css';

interface TagListProps {
  tags: Tag[];
  direction?: 'row' | 'column';
  spacings?: 'small' | 'medium';
  onTagClick?: (tag: Tag) => void;
}

export const TagList = ({
  tags,
  direction = 'row',
  spacings = 'medium',
  onTagClick,
}: TagListProps) => {
  const classes = clsx(styles.root, styles[direction], styles[spacings]);
  const tagClasses = clsx({
    [styles.tag]: onTagClick,
  });

  const tagClickHandler = (tag: Tag) => {
    if (onTagClick) onTagClick(tag);
  };

  return (
    <div className={classes}>
      {tags.map((tag) => (
        <div className={tagClasses} key={tag.id}>
          <TagBadge tag={tag} onClick={() => tagClickHandler(tag)} />
        </div>
      ))}
    </div>
  );
};
