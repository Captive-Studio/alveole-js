import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ spacing }) => ({
  inputHeading: {
    display: 'flex',
    gap: spacing('025'),
    flexDirection: 'column',
  },
}));
