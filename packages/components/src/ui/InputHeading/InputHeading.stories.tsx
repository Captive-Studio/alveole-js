import { Story } from '../../type';
import { FormControlHint } from '../FormControl/FormControlHint';
import { FormControlLabel } from '../FormControl/FormControlLabel';
import { InputHeading } from './InputHeading';
import { useStyles } from './InputHeading.styles';

export default {
  title: 'InputHeading',
  tags: ['ui'],
  experimental: false,
  description: 'Regroupe le label et le hint avec le bon espacement vertical.',
  component: InputHeading,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <InputHeading>
    <FormControlLabel label="Mon label" />
    <FormControlHint hint="Texte descriptif du champ" />
  </InputHeading>
);

export const LabelOnly = () => (
  <InputHeading>
    <FormControlLabel label="Sans hint" />
  </InputHeading>
);

export * as Sources from './InputHeading.stories.sources';
