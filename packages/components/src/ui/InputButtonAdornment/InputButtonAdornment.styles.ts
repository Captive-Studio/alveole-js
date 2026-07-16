import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color }) => ({
  textInput: {},
  controlStart: {
    borderRightWidth: 1,
    borderColor: color.border['default-grey'],
  },
  controlEnd: {
    borderColor: color.border['default-grey'],
    borderLeftWidth: 1,
  },
}));
