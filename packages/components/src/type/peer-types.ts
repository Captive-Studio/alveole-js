declare module 'react-native-keyboard-controller' {
  import React from 'react';
  import { ScrollView, ScrollViewProps } from 'react-native';

  export type KeyboardAwareScrollViewRef = ScrollView;

  export type KeyboardAwareScrollViewProps = ScrollViewProps;

  export const KeyboardAwareScrollView: React.ForwardRefExoticComponent<
    KeyboardAwareScrollViewProps & React.RefAttributes<KeyboardAwareScrollViewRef>
  >;

  export const KeyboardProvider: React.FC<{ children: React.ReactNode }>;
}
