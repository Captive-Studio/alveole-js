import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color, spacing }) => ({
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
  left: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));
