import clsx from 'clsx';
import { useState } from 'react';
import { Color } from '@/shared/model/color.types';
import styles from './SelectColor.module.css';

type ColorState = keyof typeof Color | undefined;

interface SelectColorProps {
  defaultValue: ColorState;
  onChange: (color: ColorState) => void;
}

export const SelectColor = ({ defaultValue, onChange }: SelectColorProps) => {
  const [selectedColor, setSelectedColor] = useState<ColorState>(defaultValue);

  const transformColorName = (color: Color) => color.toUpperCase();

  const getColorClasses = (color: Color) => {
    const transformedColor = transformColorName(color);

    return clsx(styles.color, styles[color], {
      [styles.selected]: transformedColor === selectedColor,
    });
  };

  const selectColorHandler = (color: Color) => {
    const transformedColor = transformColorName(color);
    const newSelectedColor =
      selectedColor === transformedColor
        ? undefined
        : (transformedColor as ColorState);

    onChange(newSelectedColor);
    setSelectedColor(newSelectedColor);
  };

  return (
    <div className={styles.root}>
      <div
        className={getColorClasses(Color.ACCENT)}
        onClick={() => selectColorHandler(Color.ACCENT)}
      ></div>
      <div
        className={getColorClasses(Color.BLUE)}
        onClick={() => selectColorHandler(Color.BLUE)}
      ></div>
      <div
        className={getColorClasses(Color.GREEN)}
        onClick={() => selectColorHandler(Color.GREEN)}
      ></div>
      <div
        className={getColorClasses(Color.SKY_BLUE)}
        onClick={() => selectColorHandler(Color.SKY_BLUE)}
      ></div>
      <div
        className={getColorClasses(Color.PINK)}
        onClick={() => selectColorHandler(Color.PINK)}
      ></div>
      <div
        className={getColorClasses(Color.RED)}
        onClick={() => selectColorHandler(Color.RED)}
      ></div>
      <div
        className={getColorClasses(Color.ORANGE)}
        onClick={() => selectColorHandler(Color.ORANGE)}
      ></div>
      <div
        className={getColorClasses(Color.YELLOW)}
        onClick={() => selectColorHandler(Color.YELLOW)}
      ></div>
    </div>
  );
};
