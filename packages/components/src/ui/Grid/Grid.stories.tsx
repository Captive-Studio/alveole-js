import { Highlight } from '../../core';
import { Story } from '../../type';
import { Grid } from './Grid';
import { useStyles } from './Grid.styles';

export default {
  title: 'Grid',
  tags: ['ui'],
  experimental: false,
  description:
    'Grille basique sur 12 colonnes (mobile et sur web). Composant de type Box à utiliser avec `<Grid.Column>`.',
  shortDescription: 'Grille basique sur 12 colonnes (mobile et web). À utiliser avec Grid.Column.',
  component: Grid,
  styleFn: useStyles,
} satisfies Story;

const codeExample = `<Grid gap={8}>
  <Grid.Column size={6}>{/* ... */}</Grid.Column>
  <Grid.Column size={6}>{/* ... */}</Grid.Column>
</Grid>`;

const codeExampleVariant = `<Grid gap={8}>
  <Grid.Column size={{ mobile: 12, desktop: 6 }}>{/* ... */}</Grid.Column>
  <Grid.Column size={{ mobile: 12, desktop: 6 }}>{/* ... */}</Grid.Column>
</Grid>`;

export const ExampleUsage = () => <Highlight language="typescript">{codeExample}</Highlight>;

export const ExampleUsageWithVariant = () => <Highlight language="typescript">{codeExampleVariant}</Highlight>;

export * as Sources from './Grid.stories.sources';
