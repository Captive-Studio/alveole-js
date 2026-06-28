import { ALVEOLE_COMPONENTS_VERSION, Box, Button, Header, Typography } from '@alveole/components';
import * as Stories from '@alveole/components/stories';
import { toStoryModules, type StorybookModule } from '@alveole/storybook';
import { useTheme } from '@alveole/theme';
import { useRouter } from 'expo-router';

export const storyList = toStoryModules(Stories) as StorybookModule[];

const AlveoleLogo = () => {
  const { color, radius, text } = useTheme();
  return (
    <Box
      style={{
        width: 32,
        height: 32,
        borderRadius: radius('md'),
        backgroundColor: color.light.background['action-high-primary'],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography style={{ ...text['Corps de texte'].XS.Bold, color: '#fff' }}>A</Typography>
    </Box>
  );
};

export const useUIKitTopBar = (activeKey: 'components' | 'colors' | 'typography' | 'constants' | 'philosophy') => {
  const router = useRouter();

  return (
    <Header
      logo={<AlveoleLogo />}
      title="Alveole UI Kit"
      right={
        <Box display="flex" flexDirection="row" flexWrap="wrap" gap={8}>
          <Button
            variant={activeKey === 'components' ? 'primary' : 'tertiary'}
            title="Composants"
            size="sm"
            onPress={() => router.replace('/')}
          />
          <Button
            variant={activeKey === 'colors' ? 'primary' : 'tertiary'}
            title="Couleurs"
            size="sm"
            onPress={() => router.replace('/theme/colors')}
          />
          <Button
            variant={activeKey === 'typography' ? 'primary' : 'tertiary'}
            title="Typographies"
            size="sm"
            onPress={() => router.replace('/theme/typographies')}
          />
          <Button
            variant={activeKey === 'constants' ? 'primary' : 'tertiary'}
            title="Constantes"
            size="sm"
            onPress={() => router.replace('/constants')}
          />
          <Button
            variant={activeKey === 'philosophy' ? 'primary' : 'tertiary'}
            title="Philosophie"
            size="sm"
            onPress={() => router.replace('/philosophy')}
          />
        </Box>
      }
    />
  );
};

export const DocFooter = () => {
  const { color, text } = useTheme();
  return (
    <Box
      style={{
        borderTopWidth: 1,
        borderTopColor: color.light.border['default-grey'],
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 24,
        paddingRight: 24,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography style={{ ...text['Corps de texte'].XS.Regular, color: color.light.text['mention-grey'] }}>
        Alveole UI Kit — v{ALVEOLE_COMPONENTS_VERSION}
      </Typography>
    </Box>
  );
};
