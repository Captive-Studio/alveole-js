import { Spacings } from '../constants';
import { Elevations } from '../constants/Elevation';
import { Font, FontWeightMap, FontsMap } from '../constants/Font';
import { RadiusList } from '../constants/Radius';
import { CustomTypography } from '../constants/Typography';
import { Theme } from '../type';
import { sanitizeCSSKey } from './sanitizeCSSKey';

const buildColorVarMap = (constants: Theme['color']['_constants']): Map<string, string> => {
  const map = new Map<string, string>();
  Object.entries(constants).forEach(([name, shades]) => {
    Object.entries(shades as Record<string, string>).forEach(([variant, value]) => {
      if (typeof value === 'string') {
        map.set(value, `--color-${name}-${variant}`);
      }
    });
  });
  return map;
};

const generateSemanticTokenLines = (
  category: string,
  tokens: Record<string, unknown>,
  colorVarMap: Map<string, string>,
): string[] => {
  const lines: string[] = [];
  Object.entries(tokens).forEach(([token, value]) => {
    if (typeof value !== 'string') return;
    const varRef = colorVarMap.get(value);
    lines.push(`  --${category}-${token}: ${varRef ? `var(${varRef})` : value};`);
  });
  return lines;
};

const generateCSSVariables = (theme: Theme): string => {
  const lines: string[] = [];
  const colorVarMap = buildColorVarMap(theme.color._constants);

  // Couleurs palette
  Object.entries(theme.color._constants).forEach(([key, colors]) => {
    Object.entries(colors).forEach(([variant, value]) => {
      lines.push(`  --color-${key}-${variant}: ${value};`);
    });
  });

  // Spacing
  Object.entries(Spacings).forEach(([key, value]) => {
    lines.push(`  --spacing-${sanitizeCSSKey(key)}: ${value}px;`);
  });

  // Radius
  Object.entries(RadiusList).forEach(([key, value]) => {
    lines.push(`  --radius-${key}: ${value}px;`);
  });

  // Elevations
  Object.entries(Elevations).forEach(([key, value]) => {
    lines.push(`  --elevation-${key}: ${value.web};`);
  });

  // Font base variables + reverse map pour les tokens typographiques
  const fontReverseMap = new Map<string, string>();
  Object.entries(FontWeightMap).forEach(([key, { familyWithFallback, weight }]) => {
    fontReverseMap.set(`${familyWithFallback}__${weight}`, key);
    lines.push(`  --font-${key}-family: ${familyWithFallback};`);
    lines.push(`  --font-${key}-weight: ${weight};`);
  });

  // Semantic tokens typographiques (--typography-{...}-font-size, etc.)
  collectTypographyLines([], CustomTypography, fontReverseMap, lines);

  // Semantic tokens light (--{category}-{token}: var(--color-...))
  const light = theme.color._rawLight as Record<string, Record<string, unknown>>;
  Object.entries(light).forEach(([category, tokens]) => {
    if (typeof tokens !== 'object' || tokens === null) return;
    lines.push(...generateSemanticTokenLines(category, tokens, colorVarMap));
  });

  const rootBlock = `:root {\n${lines.join('\n')}\n}`;

  // Overrides dark mode
  const darkLines: string[] = [];
  const dark = theme.color.dark as Record<string, Record<string, unknown>>;
  Object.entries(dark).forEach(([category, tokens]) => {
    if (typeof tokens !== 'object' || tokens === null) return;
    darkLines.push(...generateSemanticTokenLines(category, tokens, colorVarMap));
  });

  if (darkLines.length === 0) return rootBlock;

  const darkBlock = `@media (prefers-color-scheme: dark) {\n  :root {\n${darkLines.map(l => '  ' + l).join('\n')}\n  }\n}`;

  return `${rootBlock}\n\n${darkBlock}`;
};

const collectTypographyLines = (
  path: string[],
  node: unknown,
  fontReverseMap: Map<string, string>,
  lines: string[],
): void => {
  if (typeof node !== 'object' || node === null) return;
  const obj = node as Record<string, unknown>;

  if (typeof obj.fontSize === 'number') {
    const prefix = `  --typography-${path.map(sanitizeCSSKey).join('-')}`;

    if (typeof obj.fontFamily === 'string') {
      const weight = typeof obj.fontWeight === 'string' ? obj.fontWeight : '';
      const fontKey =
        fontReverseMap.get(`${obj.fontFamily}__${weight}`) ??
        (obj.fontFamily in FontWeightMap ? obj.fontFamily : undefined);
      if (fontKey) {
        lines.push(`${prefix}-font-family: var(--font-${fontKey}-family);`);
        lines.push(`${prefix}-font-weight: var(--font-${fontKey}-weight);`);
      } else {
        lines.push(`${prefix}-font-family: ${obj.fontFamily};`);
        if (weight) lines.push(`${prefix}-font-weight: ${weight};`);
      }
    }

    lines.push(`${prefix}-font-size: ${obj.fontSize}px;`);
    if (typeof obj.lineHeight === 'number') {
      lines.push(`${prefix}-line-height: ${obj.lineHeight}px;`);
    }
    if (typeof obj.letterSpacing === 'number' && obj.letterSpacing !== 0) {
      lines.push(`${prefix}-letter-spacing: ${obj.letterSpacing}px;`);
    }
    if (typeof obj.textTransform === 'string') {
      lines.push(`${prefix}-text-transform: ${obj.textTransform};`);
    }
    return;
  }

  Object.entries(obj).forEach(([key, value]) => {
    collectTypographyLines([...path, key], value, fontReverseMap, lines);
  });
};

export const injectFontFaceCSS = () => {
  if (typeof document === 'undefined') return;

  const styleId = 'theme-font-faces';
  if (document.getElementById(styleId)) return;

  const rules = Object.entries(FontsMap)
    .map(([key, src]) => {
      const { family, weight } = FontWeightMap[key as Font];
      return `@font-face {\n  font-family: '${family}';\n  src: url('${src}') format('truetype');\n  font-weight: ${weight};\n  font-style: normal;\n}`;
    })
    .join('\n');

  const styleTag = document.createElement('style');
  styleTag.id = styleId;
  styleTag.innerHTML = rules;
  document.head.appendChild(styleTag);
};

export const injectFontSmoothingCSS = () => {
  if (typeof document === 'undefined') return;

  const styleId = 'theme-font-smoothing';
  if (document.getElementById(styleId)) return;

  const styleTag = document.createElement('style');
  styleTag.id = styleId;
  styleTag.innerHTML =
    'body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; }';

  document.head.appendChild(styleTag);
};

export const injectVariableCSS = (theme: Theme) => {
  if (typeof document === 'undefined') return;

  const styleId = 'theme-css-variables';
  const oldStyle = document.getElementById(styleId);
  if (oldStyle) oldStyle.remove();

  const styleTag = document.createElement('style');
  styleTag.id = styleId;
  styleTag.innerHTML = generateCSSVariables(theme);

  document.head.appendChild(styleTag);
};
