import { Color } from '../constants';

type Between0And1 = number;

export const alpha = (hexadecimalColor: Color, opacity: Between0And1): string => {
  if (hexadecimalColor.startsWith('var(')) {
    return `color-mix(in srgb, ${hexadecimalColor} ${Math.round(opacity * 100)}%, transparent)`;
  }
  hexadecimalColor = hexadecimalColor.replace(/^#/, '');
  if (hexadecimalColor.length === 3)
    hexadecimalColor = hexadecimalColor
      .split('')
      .map(c => c + c)
      .join('');
  if (hexadecimalColor.length !== 6) throw new Error('Invalid hex color');
  const r = parseInt(hexadecimalColor.slice(0, 2), 16);
  const g = parseInt(hexadecimalColor.slice(2, 4), 16);
  const b = parseInt(hexadecimalColor.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
