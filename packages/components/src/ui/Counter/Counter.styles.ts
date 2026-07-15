import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color, spacing, text, radius }) => ({
  counter: {
    paddingRight: spacing('1,5V'),
    paddingLeft: spacing('1,5V'),
    backgroundColor: color.light.background['contrast-grey'],
    borderRadius: radius('full'),
    ...text['Corps de texte'].XS.Bold,
  },
  counterPrimary: {
    backgroundColor: color.light.background['action-high-primary'],
    color: color.light.text['inverted-primary'],
  },
}));
