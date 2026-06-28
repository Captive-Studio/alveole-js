// This file is generated. Do not edit manually.
// Source: src/ui/Header/Header.stories.tsx

export const Default = () =>
  "export const Default = () => (\n  <Header\n    logo={<LogoPlaceholder />}\n    title=\"Nom de l'app\"\n    right={\n      <>\n        <Button variant=\"tertiary\" title=\"Composants\" size=\"sm\" onPress={() => {}} />\n        <Button variant=\"tertiary\" title=\"Thème\" size=\"sm\" onPress={() => {}} />\n        <Button variant=\"primary\" title=\"Documentation\" size=\"sm\" onPress={() => {}} />\n      </>\n    }\n  />\n);";

export const SansContenuDroite = () =>
  "export const SansContenuDroite = () => <Header logo={<LogoPlaceholder />} title=\"Nom de l'app\" />;";

export const storySources = {
  Default,
  SansContenuDroite,
} as const;

export type StorySourceName = keyof typeof storySources;
