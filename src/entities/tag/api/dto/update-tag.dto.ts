import { Color } from '@/shared/model/color.types';

export interface UpdateTagDto {
  title: string;
  color: keyof typeof Color;
}
