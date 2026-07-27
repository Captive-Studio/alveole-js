import { StoryDetailScreen, findStoryByTitle } from '@alveole/storybook';
import { useLocalSearchParams } from 'expo-router';
import { DocFooter, storyList, useUIKitTopBar } from '../../components/uiKitNavigation';

export function generateStaticParams(): { component: string }[] {
  return storyList.map(story => ({ component: story.default.title }));
}

export default function ComponentDetailRoute() {
  const { component } = useLocalSearchParams<{ component: string }>();
  const story = findStoryByTitle(storyList, component);
  const topBar = useUIKitTopBar('components');

  return (
    <StoryDetailScreen
      beforeContent={topBar}
      footerContent={<DocFooter />}
      story={story}
      notFoundMessage="Composant introuvable."
    />
  );
}
