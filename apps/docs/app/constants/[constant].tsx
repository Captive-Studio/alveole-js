import { ThemeConstantDetailScreen, findConstantByName } from '@alveole/storybook';
import * as ThemeConstants from '@alveole/theme';
import { useLocalSearchParams } from 'expo-router';
import { DocFooter, useUIKitTopBar } from '../../components/uiKitNavigation';

export function generateStaticParams(): { constant: string }[] {
  return Object.keys(ThemeConstants).map(constant => ({ constant }));
}

export default function ConstantDetailRoute() {
  const { constant } = useLocalSearchParams<{ constant: string }>();
  const constantEntry = findConstantByName(ThemeConstants, constant);
  const topBar = useUIKitTopBar('constants');

  return constantEntry ? (
    <ThemeConstantDetailScreen
      beforeContent={topBar}
      footerContent={<DocFooter />}
      name={constantEntry[0]}
      value={constantEntry[1]}
    />
  ) : (
    <ThemeConstantDetailScreen
      beforeContent={topBar}
      footerContent={<DocFooter />}
      name="Constante introuvable"
      value="Constante introuvable"
    />
  );
}
