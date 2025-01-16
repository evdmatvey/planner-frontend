import { Color } from '@/shared/model/color.types';
import { TextedBadge } from '@/shared/ui/Badge';
import { Tag } from '../model/tag.types';

interface TagBadgeProps {
  tag: Tag;
}

export const TagBadge = ({ tag }: TagBadgeProps) => {
  return <TextedBadge text={tag.title} type="color" color={Color[tag.color]} />;
};
