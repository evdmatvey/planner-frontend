import { Color } from '@/shared/model/color.types';

export interface Tag {
  id: string;
  title: string;
  color: keyof typeof Color;
  tasks?: [];
}
