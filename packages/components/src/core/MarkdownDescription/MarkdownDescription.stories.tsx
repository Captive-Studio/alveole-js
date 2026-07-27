import { Story } from '../../type';
import { MarkdownDescription } from './MarkdownDescription';

export default {
  title: 'MarkdownDescription',
  tags: ['core'],
  experimental: false,
  description: 'Affiche du contenu Markdown enrichi : titres, listes, code inline, blocs de code, tableaux.',
  component: MarkdownDescription,
  styleFn: () => ({}),
} satisfies Story;

const FULL_MARKDOWN = `# Titre principal

Paragraphe avec du texte **en gras** et du texte *en italique*.

## Titres et listes

### Liste à puces

- Premier élément
- Deuxième élément
- Troisième élément

## Code

Code inline : \`const id = 'user_id_1';\`

Bloc de code TypeScript :

\`\`\`typescript
const greet = (name: string): string => {
  return \`Bonjour, \${name} !\`;
};
\`\`\`

## Tableau

| Colonne A | Colonne B | Colonne C |
|-----------|-----------|-----------|
| Cellule 1 | Cellule 2 | Cellule 3 |
| Cellule 4 | Cellule 5 | Cellule 6 |
`;

export const Default = () => <MarkdownDescription>{FULL_MARKDOWN}</MarkdownDescription>;

export const SimpleText = () => (
  <MarkdownDescription>{'Paragraphe simple avec du texte **en gras** et du texte *en italique*.'}</MarkdownDescription>
);

export const WithCodeBlock = () => (
  <MarkdownDescription>{`Utilisez \`npm install\` pour installer les dépendances.

\`\`\`bash
npm install @alveole/components
\`\`\``}</MarkdownDescription>
);

export const WithTable = () => (
  <MarkdownDescription>{`| Nom | Type | Description |
|-----|------|-------------|
| children | string | Contenu Markdown à afficher |`}</MarkdownDescription>
);

export * as Sources from './MarkdownDescription.stories.sources';
