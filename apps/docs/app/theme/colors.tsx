import { ThemePaletteScreen } from '@alveole/storybook';
import { CustomPalette } from '@alveole/theme';
import { DocFooter, useUIKitTopBar } from '../../components/uiKitNavigation';

export default function ThemeColorsRoute() {
  const topBar = useUIKitTopBar('colors');

  return (
    <ThemePaletteScreen
      palette={CustomPalette}
      title="Couleurs du thème"
      description="Palette et couleurs du thème"
      beforeContent={topBar}
      footerContent={<DocFooter />}
    />
  );
}
