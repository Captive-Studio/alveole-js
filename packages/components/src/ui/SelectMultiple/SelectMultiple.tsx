import { FormControlCaptionProps, FormControlHintProps, FormControlLabelProps, Typography } from '@alveole/components';

export type SelectMultipleOption = { label: string; value: string | number };

export type SelectMultipleProps = FormControlLabelProps &
  FormControlHintProps &
  FormControlCaptionProps & {
    options?: SelectMultipleOption[];
    value?: (string | number)[];
    placeholder?: string;
    disabled?: boolean;
    onChange?: (value: string[]) => void;
  };

export const SelectMultiple = (props: SelectMultipleProps) => {
  const { value } = props;
  return <Typography>{JSON.stringify(value)}</Typography>;
};
