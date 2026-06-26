import type { TextStyle } from 'react-native';
import type { Heights, Sizes } from '../constants';

export type CustomStyle = Pick<TextStyle, 'fontSize' | 'lineHeight' | 'fontWeight' | 'fontFamily' | 'letterSpacing'>;

export interface Typography {
  fontSize: typeof Sizes;
  lineHeight: typeof Heights;
}
