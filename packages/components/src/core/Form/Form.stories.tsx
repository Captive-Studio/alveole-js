import { KeyboardAvoidingView, Platform, TextInput as RNTextInput } from 'react-native';
import { Story } from '../../type';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { Form } from './Form';
import { useStyles } from './Form.styles';

export default {
  title: 'Form',
  tags: ['core'],
  experimental: false,
  description:
    "Empêche le clavier de cacher les TextInput sur iOS et permet de quitter le clavier au clique sur l'écran. Doit être utilisé pour contenir tous les fomulaires (pas de <form> en React Native).",
  component: Form,
  styleFn: useStyles,
} satisfies Story;

const inputStyle = { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8 };

export const WithKeyboardAware = () => (
  <Form>
    <Box display="flex" flexDirection="column" gap={12}>
      <Typography>Taper dans le champ — cliquer en dehors ferme le clavier.</Typography>
      <RNTextInput placeholder="Prénom" style={inputStyle} />
      <RNTextInput placeholder="Email" keyboardType="email-address" style={inputStyle} />
    </Box>
  </Form>
);

export const DisabledOverflow = () => (
  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <Form disabledKeyboardOverflow>
      <Box display="flex" flexDirection="column" gap={12}>
        <Typography>
          disabledKeyboardOverflow — clavier géré par KeyboardAvoidingView. Form ne rajoute pas de padding et ne ferme
          pas le clavier au tap.
        </Typography>
        <RNTextInput placeholder="Champ texte" style={inputStyle} />
      </Box>
    </Form>
  </KeyboardAvoidingView>
);

export * as Sources from './Form.stories.sources';
