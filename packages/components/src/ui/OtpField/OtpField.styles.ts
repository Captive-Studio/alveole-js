import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ text, color, spacing }) => ({
  inputHeading: {},
  containerStyle: {
    justifyContent: 'center',
    gap: spacing('050'),
  },
  pinCodeContainerStyle: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: color.border['default-grey'],
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    height: spacing('300'),
    width: spacing('300'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinCodeContainerStyleDisabled: {
    backgroundColor: color.background['disabled-grey'],
  },
  focusedPinCodeContainerStyle: {
    outlineStyle: 'solid',
    outlineWidth: 2,
    outlineColor: color.system.focus,
    outlineOffset: 2,
  },
  focusStickStyle: {
    maxHeight: spacing('100'),
  },
  pinCodeTextStyle: {
    color: color.text['default-grey'],
    ...text['Corps de texte'].LG.Regular,
  },
}));
