import { ALVEOLE_COMPONENTS_VERSION, Box, Header, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import { Pressable } from 'react-native';

export type UIKitTopBarItem = {
  key: string;
  label: string;
  onPress: () => void;
};

export type UIKitTopBarProps = {
  activeKey: string;
  items: UIKitTopBarItem[];
};

export const UIKitTopBar = ({ activeKey, items }: UIKitTopBarProps) => {
  const { color, radius, text } = useTheme();

  const left = (
    <Box display="flex" gap={2}>
      <Typography style={text['Corps de texte'].SM.Bold}>Alveole • UI Kit</Typography>
      <Typography
        style={{
          ...text['Corps de texte'].XS.Regular,
          color: color.light.text['mention-grey'],
        }}
      >
        Version {ALVEOLE_COMPONENTS_VERSION}
      </Typography>
    </Box>
  );

  const right = (
    <Box display="flex" flexDirection="row" flexWrap="wrap" gap={8}>
      {items.map(item => {
        const isActive = item.key === activeKey;

        return (
          <Pressable key={item.key} accessibilityRole="link" onPress={item.onPress}>
            {({ pressed }) => (
              <Box
                borderColor={isActive ? color.light.border['action-low-primary'] : color.light.border['default-grey']}
                borderRadius={radius('full')}
                borderWidth={1}
                pl={'100'}
                pr={'100'}
                pt={'075'}
                pb={'075'}
                style={{
                  backgroundColor: isActive
                    ? color.light.background['action-low-primary']
                    : pressed
                      ? color.light.background['alt-grey']
                      : color.light.background['default-grey'],
                  transitionDuration: '150ms',
                  transitionProperty: 'background-color, border-color, color',
                  transitionTimingFunction: 'ease',
                }}
              >
                <Typography
                  style={{
                    ...text['Corps de texte'].SM.Medium,
                    color: isActive ? color.light.text['action-high-primary'] : color.light.text['default-grey'],
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            )}
          </Pressable>
        );
      })}
    </Box>
  );

  return <Header left={left} right={right} />;
};
