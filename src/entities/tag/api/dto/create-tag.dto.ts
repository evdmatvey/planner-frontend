import { TagColor } from '../../model/tag.types';

export interface CreateTagDto {
  title: string;
  color?: TagColor;
}
