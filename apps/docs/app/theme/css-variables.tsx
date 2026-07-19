import { ThemeCSSVariablesScreen } from '@alveole/storybook';
import { DocFooter, useUIKitTopBar } from '../../components/uiKitNavigation';

export default function ThemeCSSVariablesRoute() {
  const topBar = useUIKitTopBar('css-variables');

  return <ThemeCSSVariablesScreen beforeContent={topBar} footerContent={<DocFooter />} />;
}
