// This file is generated. Do not edit manually.
// Source: src/core/Form/Form.stories.tsx

export const WithKeyboardAware = () => "export const WithKeyboardAware = () => (\n  <Form>\n    <Box display=\"flex\" flexDirection=\"column\" gap={12}>\n      <Typography>Taper dans le champ — cliquer en dehors ferme le clavier.</Typography>\n      <RNTextInput placeholder=\"Prénom\" style={inputStyle} />\n      <RNTextInput placeholder=\"Email\" keyboardType=\"email-address\" style={inputStyle} />\n    </Box>\n  </Form>\n);";

export const DisabledOverflow = () => "export const DisabledOverflow = () => (\n  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>\n    <Form disabledKeyboardOverflow>\n      <Box display=\"flex\" flexDirection=\"column\" gap={12}>\n        <Typography>\n          disabledKeyboardOverflow — clavier géré par KeyboardAvoidingView. Form ne rajoute pas de padding et ne ferme\n          pas le clavier au tap.\n        </Typography>\n        <RNTextInput placeholder=\"Champ texte\" style={inputStyle} />\n      </Box>\n    </Form>\n  </KeyboardAvoidingView>\n);";

export const storySources = {
  WithKeyboardAware,
  DisabledOverflow,
} as const;

export type StorySourceName = keyof typeof storySources;
