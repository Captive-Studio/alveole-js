import type { ViewStyle } from 'react-native';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export type SpinnerDelay = boolean | 'short' | 'long' | number;

export type SpinnerProps = {
  size?: SpinnerSize;
  delay?: SpinnerDelay;
  style?: ViewStyle;
};

export const SIZE_MAP: Record<SpinnerSize, number> = { sm: 16, md: 32, lg: 64 };
export const STROKE_MAP: Record<SpinnerSize, number> = { sm: 2, md: 3, lg: 5 };
export const DELAY_MS: Record<string, number> = { short: 300, long: 1000 };
