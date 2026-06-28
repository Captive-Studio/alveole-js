import { useTheme } from '@alveole/theme';
import { Box, Typography } from '../../core';
import { Story } from '../../type/Story';
import { Button } from '../Button';
import { Header } from './Header';
import { useStyles } from './Header.styles';

export default {
  title: 'Header',
  tags: ['ui'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=1736-931',
  description:
    'En-tête statique avec une zone gauche (logo, titre) et une zone droite au contenu libre (navigation, boutons, etc.).',
  webOnly: true,
  component: Header,
  styleFn: useStyles,
} satisfies Story;

const Logo = () => {
  const { color, text } = useTheme();
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography style={text['Corps de texte'].SM.Bold}>Alveole</Typography>
      <Typography style={{ ...text['Corps de texte'].XS.Regular, color: color.light.text['mention-grey'] }}>
        UI Kit
      </Typography>
    </Box>
  );
};

export const Default = () => (
  <Header
    left={<Logo />}
    right={
      <>
        <Button variant="tertiary" title="Composants" size="sm" onPress={() => {}} />
        <Button variant="tertiary" title="Thème" size="sm" onPress={() => {}} />
        <Button variant="primary" title="Documentation" size="sm" onPress={() => {}} />
      </>
    }
  />
);

export const SeulementGauche = () => <Header left={<Logo />} />;

export const SeulementDroite = () => (
  <Header
    right={
      <>
        <Button variant="tertiary" title="Composants" size="sm" onPress={() => {}} />
        <Button variant="primary" title="Documentation" size="sm" onPress={() => {}} />
      </>
    }
  />
);

export * as Sources from './Header.stories.sources';
