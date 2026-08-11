import { Platform } from 'react-native';
import { StyleValue } from './makeStyles';

export const grayscaleStyle: StyleValue = Platform.OS === 'web' ? { filter: 'grayscale(1)' } : { opacity: 0.5 };
