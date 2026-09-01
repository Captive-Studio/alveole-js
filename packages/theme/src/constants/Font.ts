import { Barlow_300Light } from '@expo-google-fonts/barlow/300Light';
import { Barlow_400Regular } from '@expo-google-fonts/barlow/400Regular';
import { Barlow_500Medium } from '@expo-google-fonts/barlow/500Medium';
import { Barlow_600SemiBold } from '@expo-google-fonts/barlow/600SemiBold';
import { Inter_300Light } from '@expo-google-fonts/inter/300Light';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Platform, TextStyle } from 'react-native';

export const FontsMap = {
  // Barlow
  'Barlow-Light': Barlow_300Light,
  'Barlow-Regular': Barlow_400Regular,
  'Barlow-Medium': Barlow_500Medium,
  'Barlow-Bold': Barlow_600SemiBold,
  // Inter
  'Inter-Light': Inter_300Light,
  'Inter-Regular': Inter_400Regular,
  'Inter-Medium': Inter_500Medium,
  'Inter-Bold': Inter_600SemiBold,
} as const;

// helpers
export type Font = keyof typeof FontsMap;
export const Fonts = Object.fromEntries(Object.keys(FontsMap).map(font => [font, font])) as Record<Font, Font>;

const SANS_SERIF_FALLBACK = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', sans-serif";

export const FontWeightMap: Record<
  Font,
  { family: string; familyWithFallback: string; weight: NonNullable<TextStyle['fontWeight']> }
> = {
  'Barlow-Light': { family: 'Barlow', familyWithFallback: `Barlow, ${SANS_SERIF_FALLBACK}`, weight: '300' },
  'Barlow-Regular': { family: 'Barlow', familyWithFallback: `Barlow, ${SANS_SERIF_FALLBACK}`, weight: '400' },
  'Barlow-Medium': { family: 'Barlow', familyWithFallback: `Barlow, ${SANS_SERIF_FALLBACK}`, weight: '500' },
  'Barlow-Bold': { family: 'Barlow', familyWithFallback: `Barlow, ${SANS_SERIF_FALLBACK}`, weight: '600' },
  'Inter-Light': { family: 'Inter', familyWithFallback: `Inter, ${SANS_SERIF_FALLBACK}`, weight: '300' },
  'Inter-Regular': { family: 'Inter', familyWithFallback: `Inter, ${SANS_SERIF_FALLBACK}`, weight: '400' },
  'Inter-Medium': { family: 'Inter', familyWithFallback: `Inter, ${SANS_SERIF_FALLBACK}`, weight: '500' },
  'Inter-Bold': { family: 'Inter', familyWithFallback: `Inter, ${SANS_SERIF_FALLBACK}`, weight: '600' },
};

export const fontStyle = (font: Font): { fontFamily: string; fontWeight?: TextStyle['fontWeight'] } => {
  if (Platform.OS !== 'web') return { fontFamily: font };
  const { familyWithFallback, weight } = FontWeightMap[font];
  return { fontFamily: familyWithFallback, fontWeight: weight };
};
