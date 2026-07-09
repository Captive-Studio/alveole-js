import { PhilosophyPage } from '@alveole/storybook';
import { DocFooter, useUIKitTopBar } from '../components/uiKitNavigation';

export default function PhilosophyRoute() {
  const topBar = useUIKitTopBar('philosophy');

  return <PhilosophyPage beforeContent={topBar} footerContent={<DocFooter />} />;
}
