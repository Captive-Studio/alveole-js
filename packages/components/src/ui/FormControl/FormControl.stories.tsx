import { Highlight } from '../../core';
import { Story } from '../../type';
import { FormControl } from './FormControl';
import { useStyles } from './FormControl.styles';

export default {
  title: 'FormControl',
  tags: ['Kit'],
  experimental: false,
  description: 'Eléments de construction de champs de saisie (label, input, helper text).',
  component: FormControl,
  styleFn: useStyles,
} satisfies Story;

const codeExample = `<FormControl>
  <FormControlLabel label="Label text" />
  <TextInput placeholder="Placeholder" />
  <FormControlCaption error={"Champs requis"} />
</FormControl>`;

export const ExampleUsage = () => <Highlight language="typescript">{codeExample}</Highlight>;

export * as Sources from './FormControl.stories.sources';
