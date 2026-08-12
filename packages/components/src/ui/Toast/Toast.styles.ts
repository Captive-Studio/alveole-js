import { makeStyles } from '@alveole/theme';
import { Dimensions, Platform } from 'react-native';

export const useStyles = makeStyles(({ text, color, radius, spacing, shadows }) => ({
  // Container
  tamaguiToastContainer: {
    padding: 0,
    width: Platform.OS === 'web' ? 384 : Dimensions.get('window').width,
    backgroundColor: 'transparent',
    borderRadius: 0,
    // Sur mobile, overflow:hidden sur container clippe le shadow iOS — on le pose ici
    ...(Platform.OS !== 'web' ? { borderRadius: radius('sm'), ...shadows(3) } : {}),
  },
  container: {
    backgroundColor: color.light.background['default-grey'],
    borderRadius: radius('sm'),
    display: 'flex',
    flexDirection: 'row',
    gap: spacing('1W'),
    overflow: 'hidden',
    width: '100%',
    maxWidth: 384,
    padding: 0,
    // Sur web, overflow:hidden ne clippe pas le shadow — on le pose ici pour avoir le bon borderRadius
    ...(Platform.OS === 'web' ? shadows(3) : {}),
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
