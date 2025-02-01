import { Color } from '@/shared/model/color.types';

interface ColorData {
  backgroundColor: string;
  borderColor: string;
}

export const chartColors: Record<keyof typeof Color, ColorData> = {
  ACCENT: {
    borderColor: '#7f55d6',
    backgroundColor: 'rgba(127, 85, 214, 0.2)',
  },
  BLUE: {
    borderColor: '#4b66e3',
    backgroundColor: 'rgba(75, 102, 227, 0.2)',
  },
  GREEN: {
    borderColor: '#6eda44',
    backgroundColor: 'rgba(110, 218, 68, 0.2)',
  },
  ORANGE: {
    borderColor: '#fd7231',
    backgroundColor: 'rgba(253, 114, 49, 0.2)',
  },
  PINK: {
    borderColor: '#de68db',
    backgroundColor: 'rgba(222, 104, 219, 0.2)',
  },
  SKY_BLUE: {
    borderColor: '#39b3e3',
    backgroundColor: 'rgba(57, 179, 227, 0.2)',
  },
  RED: {
    borderColor: '#f64c46',
    backgroundColor: 'rgba(246, 76, 70, 0.2)',
  },
  YELLOW: {
    borderColor: '#eea82f',
    backgroundColor: 'rgba(238, 168, 47, 0.2)',
  },
};
