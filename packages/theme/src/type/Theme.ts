import type { Colors, CustomTypography, Fonts, Grilles, Palette, Spacing, SpacingKey, Variant } from '../constants';
import { Radius, RadiusKey } from '../constants/Radius';
import { alpha } from '../helpers/alphaColor';
import { elevationStyle } from '../helpers/elevationStyle';
import type { Typography } from './Typography';

export interface Theme {
  // Spacing
  spacing: (key: SpacingKey) => Spacing;
  /** Padding externe responsive : 100 sur mobile, 150 sur desktop */
  externalPadding: () => Spacing;

  // Breakpoints
  variant: Variant;
  isVariant: (variant: Variant) => boolean;

  // Shadows
  shadows: typeof elevationStyle;

  // Radius
  radius: (key: RadiusKey) => Radius;

  // Grilles
  grilles: typeof Grilles;

  // Typographies
  text: Typography & typeof CustomTypography;

  // Fonts
  font: typeof Fonts;

  // Colors
  color: {
    /** @deprecated Utiliser la palette */
    _constants: typeof Colors;
    /** Palette light avec valeurs hex brutes, utilisée par injectVariableCSS */
    _rawLight: Palette['light'];
  } & Palette & {
      alpha: typeof alpha;
    };
}
