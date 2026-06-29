import { ALVEOLE_COMPONENTS_VERSION, Box, Button, Header, LucideIcon, Typography } from '@alveole/components';
import * as Stories from '@alveole/components/stories';
import { toStoryModules, type StorybookModule } from '@alveole/storybook';
import { useTheme } from '@alveole/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

export const storyList = toStoryModules(Stories) as StorybookModule[];

type ActiveKey = 'components' | 'colors' | 'typography' | 'constants' | 'philosophy';

const NAV_ITEMS: { key: ActiveKey; label: string; path: string }[] = [
  { key: 'components', label: 'Composants', path: '/' },
  { key: 'colors', label: 'Couleurs', path: '/theme/colors' },
  { key: 'typography', label: 'Typographies', path: '/theme/typographies' },
  { key: 'constants', label: 'Constantes', path: '/constants' },
  { key: 'philosophy', label: 'Philosophie', path: '/philosophy' },
];

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

const UIKitTopBar = ({ activeKey }: { activeKey: ActiveKey }) => {
  const router = useRouter();
  const { isVariant, color, spacing } = useTheme();
  const [menuOpen, setMenuOpen] = React.useState(false);

  if (isVariant('mobile')) {
    return (
      <>
        <Header
          logo={<AlveoleLogo />}
          right={
            <Pressable onPress={() => setMenuOpen(v => !v)} style={{ padding: 8 }}>
              <LucideIcon name={menuOpen ? 'X' : 'Menu'} size="md" color={color.light.text['title-grey']} />
            </Pressable>
          }
        />
        {menuOpen && (
          <Box
            style={{
              position: 'fixed',
              top: 64,
              left: 0,
              right: 0,
              zIndex: 99,
              backgroundColor: color.light.background['default-grey'],
              borderBottomWidth: 1,
              borderBottomColor: color.light.border['default-grey'],
              paddingTop: spacing('2W'),
              paddingBottom: spacing('2W'),
              paddingLeft: spacing('2W'),
              paddingRight: spacing('2W'),
              display: 'flex',
              flexDirection: 'column',
              gap: spacing('050'),
            }}
          >
            {NAV_ITEMS.map(item => (
              <Button
                key={item.key}
                variant={activeKey === item.key ? 'primary' : 'tertiary'}
                title={item.label}
                size="sm"
                onPress={() => {
                  router.replace(item.path);
                  setMenuOpen(false);
                }}
              />
            ))}
          </Box>
        )}
      </>
    );
  }

  return (
    <Header
      logo={<AlveoleLogo />}
      title="Alveole UI Kit"
      right={
        <Box display="flex" flexDirection="row" flexWrap="wrap" gap={8}>
          {NAV_ITEMS.map(item => (
            <Button
              key={item.key}
              variant={activeKey === item.key ? 'primary' : 'tertiary'}
              title={item.label}
              size="sm"
              onPress={() => router.replace(item.path)}
            />
          ))}
        </Box>
      }
    />
  );
};

export const useUIKitTopBar = (activeKey: ActiveKey) => <UIKitTopBar activeKey={activeKey} />;

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
