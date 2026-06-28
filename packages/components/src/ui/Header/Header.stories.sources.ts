// This file is generated. Do not edit manually.
// Source: src/ui/Header/Header.stories.tsx

export const Default = () =>
  "export const Default = () => (\n  <Header\n    left={<Logo />}\n    right={\n      <>\n        <Button variant=\"tertiary\" title=\"Composants\" size=\"sm\" onPress={() => {}} />\n        <Button variant=\"tertiary\" title=\"Thème\" size=\"sm\" onPress={() => {}} />\n        <Button variant=\"primary\" title=\"Documentation\" size=\"sm\" onPress={() => {}} />\n      </>\n    }\n  />\n);";

export const SeulementGauche = () => "export const SeulementGauche = () => <Header left={<Logo />} />;";

export const SeulementDroite = () =>
  "export const SeulementDroite = () => (\n  <Header\n    right={\n      <>\n        <Button variant=\"tertiary\" title=\"Composants\" size=\"sm\" onPress={() => {}} />\n        <Button variant=\"primary\" title=\"Documentation\" size=\"sm\" onPress={() => {}} />\n      </>\n    }\n  />\n);";

export const storySources = {
  Default,
  SeulementGauche,
  SeulementDroite,
} as const;

export type StorySourceName = keyof typeof storySources;
