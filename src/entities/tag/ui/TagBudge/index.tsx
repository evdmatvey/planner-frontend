import clsx from 'clsx';
import { Color } from '@/shared/model/color.types';
import { TextedBadge } from '@/shared/ui/Badge';
import { Tag } from '../../model/tag.types';
import styles from './TagBudge.module.css';

interface TagBadgeProps {
  tag: Tag;
  onClick?: () => void;
}

export const TagBadge = ({ tag, onClick }: TagBadgeProps) => {
  const classes = clsx({ [styles.root]: onClick });

  return (
    <div className={classes} onClick={onClick}>
      <TextedBadge text={tag.title} type="color" color={Color[tag.color]} />
    </div>
  );
};
