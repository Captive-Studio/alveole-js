import * as Stories from '@alveole/components/stories';
import { DocFooter, UIKitTopBar, toStoryModules, type StorybookModule } from '@alveole/storybook';
import { useRouter } from 'expo-router';

export { DocFooter };
export const storyList = toStoryModules(Stories) as StorybookModule[];

type ActiveKey = 'components' | 'colors' | 'typography' | 'css-variables' | 'constants' | 'philosophy';

const NAV_ITEMS: { key: ActiveKey; label: string; path: string }[] = [
  { key: 'components', label: 'Composants', path: '/' },
  { key: 'colors', label: 'Couleurs', path: '/theme/colors' },
  { key: 'typography', label: 'Typographies', path: '/theme/typographies' },
  { key: 'css-variables', label: 'Variables CSS', path: '/theme/css-variables' },
  { key: 'constants', label: 'Constantes', path: '/constants' },
  { key: 'philosophy', label: 'Philosophie', path: '/philosophy' },
];

const UIKitTopBarWithRouter = ({ activeKey }: { activeKey: ActiveKey }) => {
  const router = useRouter();

  const items = NAV_ITEMS.map(item => ({
    key: item.key,
    label: item.label,
    onPress: () => router.replace(item.path),
  }));

  return <UIKitTopBar activeKey={activeKey} items={items} />;
};

export const useUIKitTopBar = (activeKey: ActiveKey) => <UIKitTopBarWithRouter activeKey={activeKey} />;
