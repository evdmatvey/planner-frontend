import clsx from 'clsx';
import { Color } from '@/shared/model/color.types';
import styles from './TextedBadge.module.css';

export interface TextedBadgeProps {
  type?: 'color' | 'info';
  color?: Color;
  text: string;
}

export const TextedBadge = ({
  text,
  color = Color.ACCENT,
  type = 'color',
}: TextedBadgeProps) => {
  const classes = clsx(styles.root, styles[type], {
    [styles[color]]: type === 'color',
  });

  return <div className={classes}>{text}</div>;
};
