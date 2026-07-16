import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { NativePicker, NativePickerProps } from './NativePicker';

export type SelectInputProps = NativePickerProps;

export const SelectInput = React.forwardRef<Picker<string | number | object>, SelectInputProps>(
  function SelectInput(props, ref) {
    return <NativePicker ref={ref} {...props} />;
  },
);
