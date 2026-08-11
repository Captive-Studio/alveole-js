import { makeStyles, StyleValue } from '@alveole/theme';
import { Platform } from 'react-native';

export const useStyles = makeStyles(({ text, color, radius, spacing, shadows }) => ({
  // Container
  dualContainer: {
    padding: 0,
    width: Platform.select<StyleValue['width']>({ web: 384, default: '100%' }),
  },
  tamaguiToastContainer: {
    backgroundColor: 'transparent',
    borderRadius: 0,
  },
  container: {
    backgroundColor: color.light.background['default-grey'],
    borderRadius: radius('sm'),
    display: 'flex',
    flexDirection: 'row',
    gap: spacing('1W'),
    overflow: 'hidden',

    ...shadows(3),
  },

  contenu: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: spacing('1W'),
    padding: spacing('100'),
  },

  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Titre
  title: {
    ...text['Corps de texte'].SM.Bold,
    color: color.light.text['default-grey'],
  },

  // Bloc icône (panel coloré pleine hauteur)
  iconBlock: {
    display: 'flex',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: spacing('3V'),
    paddingRight: spacing('3V'),
    paddingTop: spacing('2W'),
    paddingBottom: spacing('2W'),
  },
  iconBlockDefault: {
    backgroundColor: color.light.background['flat-info'],
  },
  iconBlockInfo: {
    backgroundColor: color.light.background['flat-info'],
  },
  iconBlockSuccess: {
    backgroundColor: color.light.background['flat-success'],
  },
  iconBlockError: {
    backgroundColor: color.light.background['flat-error'],
  },
  iconBlockWarning: {
    backgroundColor: color.light.background['flat-warning'],
  },

  // Message
  message: {
    ...text['Corps de texte'].SM.Regular,
    color: color.light.text['default-grey'],
  },
}));
