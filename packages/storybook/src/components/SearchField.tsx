import { Box, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import { TextInput } from 'react-native';

export type SearchFieldProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
  size?: 'sm' | 'md';
};

export const SearchField = ({ label, placeholder, value, onChangeText, size = 'md' }: SearchFieldProps) => {
  const { text, color, radius, spacing } = useTheme();

  return (
    <Box display="flex" gap={8}>
      {label ? <Typography style={text['Corps de texte'].XS.CapsBold}>{label}</Typography> : null}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={color.light.text['mention-grey']}
        autoCapitalize="none"
        autoCorrect={false}
        style={{
          borderWidth: 1,
          borderColor: color.light.border['default-grey'],
          borderRadius: radius('md'),
          paddingVertical: size === 'sm' ? spacing('1,5V') : spacing('1W'),
          paddingHorizontal: spacing('2W'),
          backgroundColor: color.light.background['default-grey'],
          color: color.light.text['default-grey'],
          ...(size === 'sm' ? text['Corps de texte'].SM.Regular : text['Corps de texte'].MD.Regular),
        }}
      />
    </Box>
  );
};
