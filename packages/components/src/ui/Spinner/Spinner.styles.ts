import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color }) => ({
  track: { color: color.light.border['default-grey'] },
  arc: { color: color.light.artwork['major-primary'] },
}));
