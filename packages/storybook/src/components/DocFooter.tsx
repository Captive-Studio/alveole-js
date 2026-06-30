import { ALVEOLE_COMPONENTS_VERSION, Box, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';

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
