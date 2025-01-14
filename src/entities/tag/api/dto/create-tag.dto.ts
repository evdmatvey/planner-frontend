import { Color } from '@/shared/model/color.types';

export interface CreateTagDto {
  title: string;
  color?: keyof typeof Color;
}
