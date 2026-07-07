import { Box, Page, PageHeader, Section, Typography, useToast } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { Pressable } from 'react-native';

type ColorEntry = { path: string; value: string };
type ColorSection = { title: string; entries: ColorEntry[]; deprecated?: boolean };

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

const DEPRECATED_KEYS = [
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

function buildSections(palette: Record<string, unknown>): ColorSection[] {
  const sections: ColorSection[] = [];

  for (const [modeKey, modeVal] of Object.entries(palette)) {
    if (modeKey === 'light' || modeKey === 'dark') {
      if (modeVal && typeof modeVal === 'object') {
        for (const [groupKey, groupVal] of Object.entries(modeVal as Record<string, unknown>)) {
          const entries = flattenColors({ [groupKey]: groupVal }, modeKey);
          if (entries.length > 0) {
            sections.push({ title: `${modeKey} / ${groupKey}`, entries });
          }
        }
      }
    }
  }

  const deprecatedEntries: ColorEntry[] = [];
  for (const key of DEPRECATED_KEYS) {
    const val = palette[key];
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

const ColorSwatch = ({ entry }: { entry: ColorEntry }) => {
  const toast = useToast();
  const { color, radius } = useTheme();
  const tokenName = entry.path.split('.').pop() ?? entry.path;

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
              style={{ fontSize: 11, fontWeight: '600', color: color.light.text['title-grey'], lineHeight: 14 }}
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

const ColorSectionView = ({ section }: { section: ColorSection }) => {
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
          <Typography style={{ fontSize: 11, color: color.light.text['mention-grey'], marginRight: 8 }}>
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

export type ThemePaletteScreenProps = {
  palette: Record<string, unknown>;
  title?: string;
  description?: string;
  beforeContent?: React.ReactNode;
  footerContent?: React.ReactNode;
};

export const ThemePaletteScreen = ({
  palette,
  title = 'UI Kit - Couleurs du thème',
  description = 'Palette et couleurs du thème',
  beforeContent,
  footerContent,
}: ThemePaletteScreenProps) => {
  const { color } = useTheme();
  const sections = React.useMemo(() => buildSections(palette), [palette]);

  return (
    <Page
      scrollable
      title={title}
      description={description}
      beforeContent={beforeContent}
      footerContent={footerContent}
    >
      <Box display="flex" gap={24} pt="150" pb="150">
        <Section withPaddingY={false}>
          <PageHeader
            title={title}
            breadcrumbsProps={{ getHref: (segment, _index, path) => (segment === 'theme' ? null : path) }}
          />
        </Section>
        <Section withPaddingY={false}>
          <Typography style={{ fontSize: 14, color: color.light.text['mention-grey'], marginBottom: 24 }}>
            {'Cliquez sur un swatch pour copier sa valeur dans le presse-papiers.'}
          </Typography>
          {sections.map(section => (
            <ColorSectionView key={section.title} section={section} />
          ))}
        </Section>
      </Box>
    </Page>
  );
};
