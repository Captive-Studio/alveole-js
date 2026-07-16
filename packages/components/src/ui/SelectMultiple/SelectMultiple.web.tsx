import {
  Box,
  FormControl,
  FormControlCaption,
  FormControlHint,
  FormControlLabel,
  InputHeading,
} from '@alveole/components';
import React from 'react';
import ReactSelect, { StylesConfig } from 'react-select';
import type { SelectMultipleOption, SelectMultipleProps } from './SelectMultiple';
import { useStyles } from './SelectMultiple.styles';

export const SelectMultiple = React.forwardRef<any, SelectMultipleProps>(function SelectMultiple(props, ref) {
  const { value, label, labelRight, hint, error, success, placeholder = '', disabled, options, onChange } = props;

  const styles = useStyles();

  const selectStyles: StylesConfig<SelectMultipleOption, true> = {
    control: (s, p) => ({
      ...s,
      ...styles.control,
      ...(p.isDisabled ? styles.controlDisabled : {}),
    }),
    valueContainer: s => ({
      ...s,
      ...styles.valueContainer,
    }),
    multiValue: (s, p) => ({
      ...s,
      ...styles.multiValue,
      ...(p.isDisabled ? styles.multiValueDisabled : {}),
    }),
    multiValueRemove: (s, p) => ({
      ...s,
      ':hover': styles.multiValueRemoveHover,
      ...(p.isDisabled ? styles.multiValueRemoveDisabled : {}),
    }),
    dropdownIndicator: (s, p) => ({
      ...s,
      ...styles.dropdownIndicator,
      ...(p.isDisabled ? styles.dropdownIndicatorDisabled : {}),
    }),
    indicatorSeparator: (s, p) => ({
      ...s,
      ...(p.isDisabled ? styles.indicatorSeparatorDisabled : {}),
    }),
    clearIndicator: s => ({ ...s, ...styles.clearIndicator }),
  };

  const displayValue = React.useMemo(
    () => options?.filter(option => Array.isArray(value) && value.some(v => `${v}` === `${option.value}`)),
    [options, value],
  );

  return (
    <FormControl style={styles.select}>
      <InputHeading>
        {label && (
          <FormControlLabel labelRight={labelRight} label={label} disabled={disabled} error={error} success={success} />
        )}
        {hint && <FormControlHint hint={hint} disabled={disabled} />}
      </InputHeading>

      <Box tag="form-control-select-input" style={styles.inputContainer}>
        <Box style={{ ...(disabled ? styles.inputDisabled : {}) }}>
          <ReactSelect
            ref={ref}
            value={displayValue}
            styles={selectStyles}
            isMulti
            placeholder={placeholder}
            options={options}
            noOptionsMessage={() => 'Aucun résultat'}
            onChange={selectedOptions => {
              if (Array.isArray(selectedOptions)) {
                onChange?.(selectedOptions.map(o => String(o.value)));
              } else {
                onChange?.([]);
              }
            }}
            isDisabled={disabled}
          />
        </Box>
      </Box>

      {(error || success) && <FormControlCaption error={error} success={success} />}
    </FormControl>
  );
});
