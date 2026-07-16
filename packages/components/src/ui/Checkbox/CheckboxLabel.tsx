import { Typography } from '@alveole/components';
import { Label, LabelProps } from 'tamagui';
import { useStyles } from './Checkbox.styles';

export type CheckboxLabelProps = {
  variant?: 'small' | 'medium';
  label?: string;
  error?: string;
  success?: string;
};

export const CheckboxLabel = (props: CheckboxLabelProps & LabelProps) => {
  const { variant, disabled, error, success, label, ...labelProps } = props;

  const styles = useStyles();

  return (
    <Label unstyled disabled={disabled} {...labelProps} width={'100%'}>
      <Typography
        style={{
          ...styles.label,
          ...(variant === 'small' ? styles.labelSm : {}),
          ...(disabled ? styles.labelDisabled : {}),
          ...(success ? styles.labelSuccess : {}),
          ...(error ? styles.labelError : {}),
        }}
        tag="check-box-label"
      >
        {label}
      </Typography>
    </Label>
  );
};
