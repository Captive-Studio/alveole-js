import { StoriesScreen } from '@alveole/storybook';
import { router } from 'expo-router';
import { DocFooter, storyList, useUIKitTopBar } from '../components/uiKitNavigation';

export default function IndexRoute() {
  const topBar = useUIKitTopBar('components');

  return (
    <StoriesScreen
      beforeContent={topBar}
      footerContent={<DocFooter />}
      stories={storyList}
      title="UI Kit - Composants"
      description="Catalogue des composants partagés"
      onSelectStory={story => {
        router.push(`/components/${encodeURIComponent(story.default.title)}`);
      }}
    />
  );
}
