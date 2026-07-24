import * as SystemUI from 'expo-system-ui';
import React, { createContext, useContext, type PropsWithChildren } from 'react';
import { CustomBuilder, useThemeBuilder } from './helpers/useThemeBuilder';
import { ThemeProviderLoader } from './ThemeProviderLoader';
import type { Theme } from './type';
import { WebThemeStyles } from './WebThemeStyles';

const ThemeContext = createContext<Theme | null>(null);
const MIN_LOADING_DELAY = 0;

export type ThemeProviderProps = PropsWithChildren<
  CustomBuilder & {
    loader?: boolean;
    onReady?: () => void;
    staticCSS?: boolean;
  }
>;

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { loader = true, onReady, staticCSS = false, ...builder } = props;
  const theme = useThemeBuilder(builder);

  const [showLoader, setShowLoader] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setShowLoader(false), MIN_LOADING_DELAY);
    return () => clearTimeout(timeout);
  }, []);

  React.useEffect(() => {
    void SystemUI.setBackgroundColorAsync('white');
  }, []);

  React.useEffect(() => {
    if (onReady && theme.isReady) onReady();
  }, [onReady, theme.isReady]);

  if ((!theme.isReady || showLoader) && loader !== false) {
    return (
      <>
        {!staticCSS && <WebThemeStyles theme={theme} />}
        <ThemeProviderLoader />
      </>
    );
  }

  return (
    <ThemeContext.Provider value={theme}>
      <WebThemeStyles theme={theme} />
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};
