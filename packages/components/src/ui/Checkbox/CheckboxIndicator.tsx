import { LucideIcon } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import { Checkbox as TamaguiCheckbox } from 'tamagui';
import { useStyles } from './Checkbox.styles';

export type CheckboxIndicatorProps = {
  variant?: 'small' | 'medium';
  indeterminate?: boolean;
  disabled?: boolean;
};

export const CheckboxIndicator = (props: CheckboxIndicatorProps) => {
  const { variant, disabled, indeterminate } = props;

  const { color } = useTheme();
  const styles = useStyles();

  return (
    <TamaguiCheckbox.Indicator
      style={{
        ...styles.indicator,
        ...(variant === 'small' ? styles.checkboxSm : {}),
        ...(disabled ? styles.indicatorDisabled : {}),
      }}
    >
      <LucideIcon
        size={variant === 'small' ? 'xs' : 'sm'}
        name={indeterminate ? 'Minus' : 'Check'}
        color={disabled ? color.text['default-grey'] : '#FFFFFF'}
        style={{ margin: 'auto' }}
      />
    </TamaguiCheckbox.Indicator>
  );
};
