import { RadioGroup as TamaguiRadioGroup } from 'tamagui';
import { useStyles } from './RadioGroup.styles';
import { useRadioGroup } from './RadioGroupContext';

export type RadioInputProps = {
  value: string;
  id: string;
  size: 'sm' | 'md';
};

export const RadioInput = (props: RadioInputProps) => {
  const { value, id, size = 'md' } = props;

  const { value: selectedValue, onChange } = useRadioGroup();
  const isSelected = selectedValue === value;

  const styles = useStyles();

  const itemStyles = { ...styles.itemContainer, ...(size === 'sm' ? styles.itemContainerSm : styles.itemContainerMd) };
  const indicatorStyle = { ...styles.itemContainer, ...(isSelected ? styles.itemContainerActive : {}) };

  return (
    <TamaguiRadioGroup.Item
      value={value}
      id={id}
      style={itemStyles}
      focusStyle={styles.itemContainerActive}
      hoverStyle={indicatorStyle as any}
      pressStyle={styles.itemContainerActive}
      onPress={() => onChange?.(value)}
    >
      <TamaguiRadioGroup.Indicator style={styles.itemIndicator} />
    </TamaguiRadioGroup.Item>
  );
};
