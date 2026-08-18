import React from 'react';
import { Box, Typography } from '../../core';
import { useStyles } from './FormControl.styles';
import { FormControlCaptionProps } from './FormControlCaption';

export type FormControlLabelProps = {
  label: string;
  labelRight?: React.ReactNode;
  optional?: boolean;
  optionalText?: string;
  disabled?: boolean;
} & FormControlCaptionProps;

export const FormControlLabel = (props: FormControlLabelProps) => {
  const { label, labelRight, optional = false, optionalText = '(optionnel)', disabled, error, success } = props;

  const styles = useStyles();

  return (
    <Box style={styles.labelContainer}>
      <Typography
        style={{
          ...styles.label,
          ...(error ? styles.errorText : {}),
          ...(success ? styles.successText : {}),
          ...(disabled ? styles.labelDisabled : {}),
        }}
      >
        {label}
      </Typography>
      {!!optional && <Typography style={styles.optionalText}>{optionalText}</Typography>}
      {!!label && (
        <Box mt={'auto'} mb={'auto'} ml={'auto'}>
          {labelRight}
        </Box>
      )}
    </Box>
  );
};
