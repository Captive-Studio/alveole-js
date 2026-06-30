import { Box, Typography } from '../../core';
import { useStyles } from './FormControl.styles';

export type FormControlHintProps = {
  hint?: string;
  disabled?: boolean;
};

export const FormControlHint = (props: FormControlHintProps) => {
  const { hint, disabled } = props;

  const styles = useStyles();

  return (
    <Box style={styles.hintContainer}>
      <Typography style={{ ...styles.hint, ...(disabled ? styles.hintDisabled : {}) }}>{hint}</Typography>
    </Box>
  );
};
