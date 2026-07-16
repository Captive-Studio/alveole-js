import { makeStyles } from '@alveole/theme';
import { Platform } from 'react-native';

export const useStyles = makeStyles(({ text, color, spacing }) => ({
  pickerContainer: {},
  picker: {
    flex: 1,
    outline: 'none',
    padding: 0,
    paddingTop: spacing('050'),
    paddingBottom: spacing('050'),
    paddingLeft: spacing('100'),
    paddingRight: spacing('100'),
    color: color.text['default-grey'],
    ...text['Corps de texte'].MD.Regular,
    width: '100%',
    borderWidth: 0,
    backgroundColor: 'transparent',
    appearance: 'none',
  },
  inputContainer: {
    width: '100%',
    padding: 0,
  },
  inputInner: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing('050'),
    padding: 0,
    borderRadius: 8,
    borderWidth: Platform.OS === 'ios' ? 0 : 1,
    borderColor: Platform.OS === 'ios' ? undefined : color.border['default-grey'],
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    width: '100%',
  },
  inputError: {
    borderColor: color.border['plain-error'],
  },
  inputSuccess: {
    borderColor: color.border['plain-success'],
  },
  inputDisabled: {
    borderColor: color.border['disabled-grey'],
  },
  inputFocused: {
    outlineStyle: 'solid',
    outlineWidth: 2,
    outlineColor: color.system.focus,
    outlineOffset: 2,
  },
  indicator: {
    position: 'absolute',
    right: spacing('100'),
    top: spacing('075'),
  },
  indicatorFocus: {},
}));
