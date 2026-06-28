import { Toasts } from '@alveole/components';
import { ThemeProvider } from '@alveole/theme';
import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { TamaguiProvider } from 'tamagui';
import { DocFooter } from '../components/uiKitNavigation';
import { tamaguiConfig } from '../tamagui.config';

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <ThemeProvider loader={false}>
        <Toasts>
          <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Stack screenOptions={{ headerShown: false }} style={{ flex: 1 }} />
            <DocFooter />
          </View>
        </Toasts>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
