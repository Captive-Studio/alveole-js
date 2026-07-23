import { useTheme } from '@alveole/theme';
import React from 'react';
import { Platform, Text } from 'react-native';
import { Box } from '../Box';
import { Code } from '../Code';
import { Highlight, HighlightProps } from '../Highlight';
import { Typography } from '../Typography';

export type MarkdownDescriptionProps = {
  children: string;
};

const HIGHLIGHT_LANGUAGES: HighlightProps['language'][] = [
  'json',
  'typescript',
  'tsx',
  'ruby',
  'bash',
  'html',
  'plaintext',
];

const extractLanguage = (className?: string): HighlightProps['language'] => {
  const match = /language-(\w+)/.exec(className ?? '');
  return HIGHLIGHT_LANGUAGES.find(l => l === match?.[1]) ?? 'plaintext';
};

export const MarkdownDescription = ({ children }: MarkdownDescriptionProps) => {
  const { text } = useTheme();

  const bodyStyle = text['Corps de texte'].MD.Regular;
  const boldStyle = text['Corps de texte'].MD.Bold;

  if (Platform.OS !== 'web') {
    return <Typography style={bodyStyle}>{children}</Typography>;
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ReactMarkdown = require('react-markdown').default as React.ComponentType<{
    children: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    components: Record<string, React.ComponentType<any>>;
  }>;

  return (
    <Box tag="markdown-description" display="flex" gap={8}>
      <ReactMarkdown
        components={{
          p: ({ children: c }: { children: React.ReactNode }) => <Typography style={bodyStyle}>{c}</Typography>,
          strong: ({ children: c }: { children: React.ReactNode }) => <Text style={boldStyle}>{c}</Text>,
          em: ({ children: c }: { children: React.ReactNode }) => (
            <Text style={[bodyStyle, { fontStyle: 'italic' as const }]}>{c}</Text>
          ),
          h1: ({ children: c }: { children: React.ReactNode }) => (
            <Typography style={text.Titres['H3 - MD']}>{c}</Typography>
          ),
          h2: ({ children: c }: { children: React.ReactNode }) => (
            <Typography style={text.Titres['H4 - SM']}>{c}</Typography>
          ),
          h3: ({ children: c }: { children: React.ReactNode }) => (
            <Typography style={text.Titres['H5 - XS']}>{c}</Typography>
          ),
          h4: ({ children: c }: { children: React.ReactNode }) => (
            <Typography style={text.Titres['H6 - XXS']}>{c}</Typography>
          ),
          ul: ({ children: c }: { children: React.ReactNode }) => (
            <Box display="flex" gap={4}>
              {c}
            </Box>
          ),
          ol: ({ children: c }: { children: React.ReactNode }) => (
            <Box display="flex" gap={4}>
              {c}
            </Box>
          ),
          li: ({ children: c }: { children: React.ReactNode }) => (
            <Box display="flex" flexDirection="row" gap={8} style={{ alignItems: 'flex-start' }}>
              <Typography style={bodyStyle}>{'•'}</Typography>
              <Typography style={[bodyStyle, { flex: 1 }]}>{c}</Typography>
            </Box>
          ),
          pre: ({ children: c }: { children: React.ReactNode }) => <Box display="flex">{c}</Box>,
          code: ({
            inline,
            className,
            children: c,
          }: {
            inline?: boolean;
            className?: string;
            children: React.ReactNode;
          }) => {
            if (inline) {
              return <Code>{c}</Code>;
            }

            return <Highlight language={extractLanguage(className)}>{String(c).replace(/\n$/, '')}</Highlight>;
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </Box>
  );
};
