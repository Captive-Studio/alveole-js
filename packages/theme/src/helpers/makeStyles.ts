import { CSSProperties } from 'react';
import { useTheme } from '../ThemeProvider';
import { removeUnsupportedCSSProperties } from './removeUnsupportedCSSProperties';

export type StyleValue = CSSProperties & {
  width?: number | `${string}%`;
  height?: number | `${string}%`;
};

/**
 * Génère les styles pour les composants en injectant le theme
 * @param stylesFn - (theme: Theme) => CSSProperties
 * @returns Des proprité css avec les valeurs du thème injecté
 */
export function makeStyles<T extends Record<string, StyleValue>>(
  stylesFn: (theme: ReturnType<typeof useTheme>) => T,
): () => T {
  return () => {
    const theme = useTheme();
    const styles = stylesFn(theme);
    return removeUnsupportedCSSProperties(styles);
  };
}
