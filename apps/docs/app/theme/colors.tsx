import { Box, Typography, useToast } from '@alveole/components';
import { CustomPalette, useTheme } from '@alveole/theme';
import React from 'react';
import { Pressable, ScrollView } from 'react-native';
import { DocFooter, useUIKitTopBar } from '../../components/uiKitNavigation';

type ColorEntry = { path: string; value: string };

function flattenColors(obj: Record<string, unknown>, prefix = ''): ColorEntry[] {
  const entries: ColorEntry[] = [];
  for (const [key, val] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'string') {
      entries.push({ path, value: val });
    } else if (val && typeof val === 'object') {
      entries.push(...flattenColors(val as Record<string, unknown>, path));
    }
  }
  return entries;
}

type Section = { title: string; entries: ColorEntry[]; deprecated?: boolean };

function buildSections(): Section[] {
  const sections: Section[] = [];
  const deprecatedKeys = [
    'primary',
    'transparent',
    'danger',
    'info',
    'success',
    'warning',
    'link',
    'text',
    'border',
    'background',
    'system',
  ];

  // Semantic sections: light.*, dark.*
  for (const [modeKey, modeVal] of Object.entries(CustomPalette)) {
    if (modeKey === 'light' || modeKey === 'dark') {
      if (modeVal && typeof modeVal === 'object') {
        for (const [groupKey, groupVal] of Object.entries(modeVal as Record<string, unknown>)) {
          const entries = flattenColors({ [groupKey]: groupVal }, modeKey);
          if (entries.length > 0) {
            sections.push({ title: `${modeKey} / ${groupKey}`, entries });
          }
        }
      }
    } else if (deprecatedKeys.includes(modeKey)) {
      // collected separately
    }
  }

  // Deprecated section
  const deprecatedEntries: ColorEntry[] = [];
  for (const key of deprecatedKeys) {
    const val = (CustomPalette as Record<string, unknown>)[key];
    if (val !== undefined) {
      if (typeof val === 'string') {
        deprecatedEntries.push({ path: key, value: val });
      } else if (val && typeof val === 'object') {
        deprecatedEntries.push(...flattenColors(val as Record<string, unknown>, key));
      }
    }
  }
  if (deprecatedEntries.length > 0) {
    sections.push({ title: 'Deprecated', entries: deprecatedEntries, deprecated: true });
  }

  return sections;
}

const SECTIONS = buildSections();

function isColorDark(hex: string): boolean {
  // Simple luminance check for hex colors
  const clean = hex.replace('#', '');
  if (clean.length !== 6 && clean.length !== 3) return false;
  const expanded =
    clean.length === 3
      ? clean
          .split('')
          .map(c => c + c)
          .join('')
      : clean;
  const r = parseInt(expanded.substring(0, 2), 16);
  const g = parseInt(expanded.substring(2, 4), 16);
  const b = parseInt(expanded.substring(4, 6), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b < 128;
}

const ColorSwatch = ({ entry }: { entry: ColorEntry }) => {
  const toast = useToast();
  const { color, radius } = useTheme();
  const tokenName = entry.path.split('.').pop() ?? entry.path;
  const isDark = isColorDark(entry.value);

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(entry.value).then(() => {
        toast.present('Copié !', entry.value, { variant: 'success', duration: 1500 });
      });
    }
  };

  return (
    <Pressable onPress={handleCopy} style={{ width: 120, marginBottom: 8 }}>
      {({ pressed }) => (
        <Box
          style={{
            borderRadius: radius('md'),
            overflow: 'hidden',
            opacity: pressed ? 0.8 : 1,
            borderWidth: 1,
            borderColor: color.light.border['default-grey'],
          }}
        >
          <Box style={{ height: 56, backgroundColor: entry.value }} />
          <Box
            style={{
              paddingHorizontal: 8,
              paddingVertical: 6,
              backgroundColor: color.light.background['default-grey'],
            }}
          >
            <Typography
              style={{
                fontSize: 11,
                fontWeight: '600',
                color: color.light.text['title-grey'],
                lineHeight: 14,
              }}
              numberOfLines={1}
            >
              {tokenName}
            </Typography>
            <Typography
              style={{
                fontSize: 10,
                color: color.light.text['mention-grey'],
                fontFamily: 'monospace',
                lineHeight: 14,
                marginTop: 2,
              }}
              numberOfLines={1}
            >
              {entry.value}
            </Typography>
          </Box>
        </Box>
      )}
    </Pressable>
  );
};

const ColorSection = ({ section }: { section: Section }) => {
  const [collapsed, setCollapsed] = React.useState(section.deprecated === true);
  const { color, radius } = useTheme();

  return (
    <Box style={{ marginBottom: 24 }}>
      <Pressable onPress={() => setCollapsed(c => !c)}>
        <Box
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 16,
            backgroundColor: color.light.background['alt-grey'],
            borderRadius: radius('md'),
            borderWidth: 1,
            borderColor: color.light.border['default-grey'],
            marginBottom: collapsed ? 0 : 12,
          }}
        >
          <Typography
            style={{
              fontSize: 13,
              fontWeight: '700',
              color: section.deprecated ? color.light.text['mention-grey'] : color.light.text['title-grey'],
              flex: 1,
              fontFamily: 'monospace',
            }}
          >
            {section.title}
          </Typography>
          <Typography
            style={{
              fontSize: 11,
              color: color.light.text['mention-grey'],
              marginRight: 8,
            }}
          >
            {section.entries.length} token{section.entries.length > 1 ? 's' : ''}
          </Typography>
          <Typography style={{ fontSize: 12, color: color.light.text['mention-grey'] }}>
            {collapsed ? '▸' : '▾'}
          </Typography>
        </Box>
      </Pressable>

      {!collapsed && (
        <Box style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 4 }}>
          {section.entries.map(entry => (
            <ColorSwatch key={entry.path} entry={entry} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default function ThemeColorsRoute() {
  const topBar = useUIKitTopBar('colors');
  const { color } = useTheme();

  return (
    <Box style={{ flex: 1, backgroundColor: color.light.background['default-grey'] }}>
      {topBar}
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 48 }}>
        <Typography
          style={{
            fontSize: 24,
            fontWeight: '700',
            color: color.light.text['title-grey'],
            marginBottom: 4,
          }}
        >
          Couleurs du thème
        </Typography>
        <Typography
          style={{
            fontSize: 14,
            color: color.light.text['mention-grey'],
            marginBottom: 32,
          }}
        >
          Cliquez sur un swatch pour copier sa valeur dans le presse-papiers.
        </Typography>

        {SECTIONS.map(section => (
          <ColorSection key={section.title} section={section} />
        ))}
        <DocFooter />
      </ScrollView>
    </Box>
  );
}
