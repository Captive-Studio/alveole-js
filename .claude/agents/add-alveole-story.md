---
name: add-alveole-story
description: >-
  Ajoute une story pour un composant dans le repo alveole-js (packages/components).
  Crée le fichier .stories.tsx, gère le fichier sources (gitignore), et enregistre la story
  dans l'index. Utiliser quand l'utilisateur dit "ajoute une story pour X",
  "crée une story", "add a story for component X", ou mentionne qu'un composant
  n'a pas de story dans alveole-js.
---

# Ajouter une story — alveole-js

Workflow pour ajouter une story à un composant exposé par `@alveole/components`.

## Étapes

### 1. Localiser le composant

Le composant se trouve dans l'un de ces deux endroits :

- `packages/components/src/core/<ComponentName>/` — composants primitifs (Box, Typography, etc.)
- `packages/components/src/ui/<ComponentName>/` — composants UI métier (Button, Card, etc.)

Repérer si un fichier `<ComponentName>.styles.ts` existe dans ce dossier.

### 2. Créer `<ComponentName>.stories.tsx`

Dans le dossier du composant, créer le fichier de story :

```tsx
import { Story } from '../../type';  // ajuster le chemin relatif si ui/ vs core/
import { ComponentName } from './ComponentName';
import { useStyles } from './ComponentName.styles'; // uniquement si le fichier existe

export default {
  title: 'ComponentName',
  tags: ['core'],          // 'core' pour les primitifs, autre valeur au besoin
  experimental: false,
  description: `Description longue en **Markdown** destinée à l'utilisateur.

Expliquer ici le fonctionnement du composant, ses cas d'usage, ses contraintes.
Peut contenir des titres, du code inline, des listes, etc.`,
  shortDescription: "Résumé court du composant, utilisé comme balise meta pour le SEO.",
  component: ComponentName,
  styleFn: useStyles,      // ou () => ({}) si pas de fichier styles
} satisfies Story;

export const Default = () => <ComponentName>...</ComponentName>;

// Ajouter d'autres exports nommés pour les variantes importantes

export * as Sources from './ComponentName.stories.sources';
```

**Points critiques :**

- `description` (obligatoire) : texte long en Markdown, visible dans la documentation pour l'utilisateur. Peut contenir des titres, du code, des listes.
- `shortDescription` (optionnel) : texte court en texte brut, utilisé comme balise meta pour le SEO dans la doc web. Ne pas mettre de Markdown dedans.
- `styleFn` est **obligatoire** dans le type `Story` — toujours le fournir. Si le composant n'a pas de fichier `.styles.ts`, utiliser `styleFn: () => ({})` en ligne.
- Chaque export nommé (hors `default` et `Sources`) devient une variante visible dans la UI du storybook.
- `export * as Sources` doit toujours être la dernière ligne.
- Le chemin vers `'../../type'` est relatif : `../../type` depuis `core/` ou `ui/`, ajuster si la profondeur diffère.

### 3. Le fichier `.stories.sources.ts` — ne pas committer

Le fichier `<ComponentName>.stories.sources.ts` est listé dans `.gitignore` (`*.stories.sources.ts`) car il est **généré automatiquement**. Ne pas le committer.

Pour le générer localement (utile si le storybook en a besoin en développement) :

```bash
cd packages/components
npm run generate:sources
```

### 4. Enregistrer dans l'index des stories

Dans `packages/components/src/stories/index.ts`, ajouter l'export en ordre alphabétique dans la section appropriée (`// Core` ou `// UI`) :

```ts
export * as ComponentNameStory from '../core/ComponentName/ComponentName.stories';
// ou pour ui/ :
export * as ComponentNameStory from '../ui/ComponentName/ComponentName.stories';
```

### 5. Vérification TypeScript

```bash
cd packages/components && npx tsc --noEmit
```

Corriger toute erreur avant de finir.

## Rappels

- Le nom d'export dans `stories/index.ts` suit le pattern `{ComponentName}Story`.
- Les tags acceptés incluent `'core'`, `'Kit'`, `'Composant'`, `'Template'` et toute chaîne libre.
- Ne pas oublier `export * as Sources` même si le fichier sources est gitignore — l'import est résolu à la compilation via le fichier généré.
