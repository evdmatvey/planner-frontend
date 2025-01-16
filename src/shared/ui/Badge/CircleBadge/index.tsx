import clsx from 'clsx';
import { Color } from '@/shared/model/color.types';
import styles from './CircleBadge.module.css';

export interface CircleBadgeProps {
  color: Color;
}

export const CircleBadge = ({ color }: CircleBadgeProps) => {
  const classes = clsx(styles.root, styles[color]);

  return <div className={classes}></div>;
};
