import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ spacing, color, radius }) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: color.light.background['default-grey'],
    borderWidth: 1,
    borderColor: color.light.border['default-grey'],
    borderStyle: 'solid',
    boxSizing: 'border-box',
    borderRadius: radius('md'),
    overflow: 'hidden',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing('3V'),
    padding: spacing('3V'),
  },
}));
