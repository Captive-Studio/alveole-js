import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color, text, spacing }) => ({
  container: {
    backgroundColor: color.light.background['alt-grey'],
    borderBottomWidth: 1,
    borderBottomColor: color.light.border['default-grey'],
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: spacing('2W'),
    paddingRight: spacing('2W'),
    paddingTop: spacing('2W'),
    paddingBottom: spacing('2W'),
  },
  identity: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing('2W'),
  },
  titleText: {
    ...text['Corps de texte'].SM.Bold,
    color: color.light.text['title-grey'],
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));
