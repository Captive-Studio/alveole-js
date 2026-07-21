import { useMemo } from 'react';
import { generateCSSVariables, generateFontFaceCSS, generateFontSmoothingCSS } from './helpers/injectVariableCSS';
import type { Theme } from './type';

const fontFaceCSS = generateFontFaceCSS();
const fontSmoothingCSS = generateFontSmoothingCSS();

export function WebThemeStyles({ theme }: { theme: Theme }) {
  const cssVariables = useMemo(() => generateCSSVariables(theme), [theme]);

  return (
    <>
      <style precedence="default" dangerouslySetInnerHTML={{ __html: cssVariables }} />
      <style precedence="default" dangerouslySetInnerHTML={{ __html: fontFaceCSS }} />
      <style precedence="default" dangerouslySetInnerHTML={{ __html: fontSmoothingCSS }} />
    </>
  );
}
