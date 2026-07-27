import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(() => ({
  container: {},
  link: {
    color: 'inherit',
  },
  pressable: {
    cursor: 'pointer',
    color: 'inherit',
    transitionProperty: 'all',
    transitionDuration: '0.1s',
    transitionTimingFunction: 'ease-in-out',
  },
}));
