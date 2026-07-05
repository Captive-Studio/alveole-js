import * as Stories from '@alveole/components/stories';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function StoryTestRoute() {
  const { module: moduleName, story } = useLocalSearchParams<{
    module: string;
    story: string;
  }>();

  const storyModule = (Stories as Record<string, Record<string, () => JSX.Element>>)[moduleName];
  const StoryComponent = storyModule?.[story];

  if (!StoryComponent) return null;

  return (
    <View style={{ padding: 16 }}>
      <StoryComponent />
    </View>
  );
}
