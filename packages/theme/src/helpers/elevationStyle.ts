import { Platform } from 'react-native';
import { ElevationKey, Elevations } from '../constants';

const isElevationKey = (key: ElevationKey): key is keyof typeof Elevations =>
  Object.prototype.hasOwnProperty.call(Elevations, key);

/**
 * Transforme les shadow en fonction de la platforme (web ou mobile)
 * @param level L’élévation
 * @returns
 */
export const elevationStyle = (level: ElevationKey) => {
  if (!isElevationKey(level)) return;
  if (Platform.OS === 'web') return { boxShadow: `var(--elevation-${level})` };
  return Elevations[level].mobile;
};
