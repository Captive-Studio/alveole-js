import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color, text, radius }) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  pen: {
    color: color.light.text['default-grey'],
    backgroundColor: '#FFFFFF',
  },
  signatureWeb: {
    borderColor: color.light.border['default-grey'],
    borderWidth: 2,
    borderRadius: radius('lg'),
  },

  headerSignature: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  date: {
    ...text['Corps de texte'].XS.Regular,
  },
}));
