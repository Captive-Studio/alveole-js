// This file is generated. Do not edit manually.
// Source: src/ui/InputHeading/InputHeading.stories.tsx

export const Default = () => "export const Default = () => (\n  <InputHeading>\n    <FormControlLabel label=\"Mon label\" />\n    <FormControlHint hint=\"Texte descriptif du champ\" />\n  </InputHeading>\n);";

export const LabelOnly = () => "export const LabelOnly = () => (\n  <InputHeading>\n    <FormControlLabel label=\"Sans hint\" />\n  </InputHeading>\n);";

export const storySources = {
  Default,
  LabelOnly,
} as const;

export type StorySourceName = keyof typeof storySources;
