import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ spacing, spacingValue, color, text }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing('3W'),
  },
  partContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spacing('1W'),
    alignSelf: 'stretch',
  },
  partTitle: {
    paddingLeft: spacing('2W'),
    paddingRight: spacing('2W'),
    ...text['Corps de texte'].XS.Bold,
    color: color.light.text['mention-grey'],
  },
  filtersHorizontalScroll: {
    minWidth: 0,
    flexGrow: 0,
  },
  filtersScroll: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing('1W'),
    flexGrow: 0,
    paddingLeft: spacingValue('2W'),
    paddingRight: spacingValue('2W'),
  },
}));
