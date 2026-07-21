import type { Theme } from './type';

// Stub natif — les styles CSS sont injectés via useEffect dans ThemeProvider sur native
export function WebThemeStyles(_: { theme: Theme }) {
  return null;
}
