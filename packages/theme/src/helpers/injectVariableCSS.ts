import { Spacings } from '../constants';
import { Font, FontWeightMap, FontsMap } from '../constants/Font';
import { Theme } from '../type';

const generateCSSVariables = (theme: Theme): string => {
  const lines: string[] = [];

  // Couleurs
  Object.entries(theme.color._constants).forEach(([key, colors]) => {
    Object.entries(colors).forEach(([variant, value]) => {
      lines.push(`  --color-${key}-${variant}: ${value};`);
    });
  });

  // Spacing
  Object.entries(Spacings).forEach(([key, value]) => {
    lines.push(`  --spacing-${key}: ${value}px;`);
  });

  return `:root {\n${lines.join('\n')}\n}`;
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
