import { Platform, TextStyle } from 'react-native';

export const FontsMap = {
  // Barlow
  'Barlow-Light': require('../../assets/fonts/Barlow/Barlow-Light.ttf'),
  'Barlow-Regular': require('../../assets/fonts/Barlow/Barlow-Regular.ttf'),
  'Barlow-Medium': require('../../assets/fonts/Barlow/Barlow-Medium.ttf'),
  'Barlow-SemiBold': require('../../assets/fonts/Barlow/Barlow-SemiBold.ttf'),
  'Barlow-Bold': require('../../assets/fonts/Barlow/Barlow-Bold.ttf'),
  // Inter
  'Inter-Light': require('../../assets/fonts/Inter/Inter-Light.ttf'),
  'Inter-Regular': require('../../assets/fonts/Inter/Inter-Regular.ttf'),
  'Inter-Medium': require('../../assets/fonts/Inter/Inter-Medium.ttf'),
  'Inter-SemiBold': require('../../assets/fonts/Inter/Inter-SemiBold.ttf'),
  'Inter-Bold': require('../../assets/fonts/Inter/Inter-Bold.ttf'),
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
  'Barlow-SemiBold': { family: 'Barlow', familyWithFallback: `Barlow, ${SANS_SERIF_FALLBACK}`, weight: '600' },
  'Barlow-Bold': { family: 'Barlow', familyWithFallback: `Barlow, ${SANS_SERIF_FALLBACK}`, weight: '700' },
  'Inter-Light': { family: 'Inter', familyWithFallback: `Inter, ${SANS_SERIF_FALLBACK}`, weight: '300' },
  'Inter-Regular': { family: 'Inter', familyWithFallback: `Inter, ${SANS_SERIF_FALLBACK}`, weight: '400' },
  'Inter-Medium': { family: 'Inter', familyWithFallback: `Inter, ${SANS_SERIF_FALLBACK}`, weight: '500' },
  'Inter-SemiBold': { family: 'Inter', familyWithFallback: `Inter, ${SANS_SERIF_FALLBACK}`, weight: '600' },
  'Inter-Bold': { family: 'Inter', familyWithFallback: `Inter, ${SANS_SERIF_FALLBACK}`, weight: '700' },
};

export const fontStyle = (font: Font): { fontFamily: string; fontWeight?: TextStyle['fontWeight'] } => {
  if (Platform.OS !== 'web') return { fontFamily: font };
  const { familyWithFallback, weight } = FontWeightMap[font];
  return { fontFamily: familyWithFallback, fontWeight: weight };
};
