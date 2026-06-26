// This file is generated. Do not edit manually.
// Source: src/ui/Breadcrumbs/Breadcrumbs.stories.tsx

export const Default = () => "export const Default = () => (\n  <Box p={4}>\n    <Breadcrumbs />\n  </Box>\n);";

export const WithCustomRootLabel = () => "export const WithCustomRootLabel = () => (\n  <Box p={4}>\n    <Breadcrumbs rootLabel=\"Tableau de bord\" />\n  </Box>\n);";

export const WithCustomLabels = () => "export const WithCustomLabels = () => (\n  <Box p={4}>\n    <Breadcrumbs\n      getLabel={(segment, _index, _path) => {\n        const labels: Record<string, string> = {\n          admin: 'Administration',\n          missions: 'Missions',\n          show: 'Détail',\n          salarie: 'Espace salarié',\n          client: 'Espace client',\n        };\n        return labels[segment] ?? segment;\n      }}\n    />\n  </Box>\n);";

export const WithCustomHref = () => "export const WithCustomHref = () => (\n  <Box p={4}>\n    <Breadcrumbs\n      getHref={(segment, _index, path) => {\n        const hrefs: Record<string, string> = {\n          components: '/ui-kit/components',\n        };\n        return hrefs[segment] ?? path;\n      }}\n    />\n  </Box>\n);";

export const WithNoLink = () => "export const WithNoLink = () => (\n  <Box p={4}>\n    <Breadcrumbs\n      getHref={(segment, _index, path) => {\n        const noLink = ['components'];\n        return noLink.includes(segment) ? null : path;\n      }}\n    />\n  </Box>\n);";

export const WithSegmentsToSkip = () => "export const WithSegmentsToSkip = () => (\n  <Box p={4}>\n    <Breadcrumbs\n      segmentsToSkip={['admin', 'ui-kit', 'components']}\n      getLabel={(segment, _index, _path) => {\n        const labels: Record<string, string> = {\n          admin: 'Administration',\n          missions: 'Missions',\n          show: 'Détail',\n          salarie: 'Espace salarié',\n          client: 'Espace client',\n        };\n        return labels[segment] ?? segment;\n      }}\n    />\n  </Box>\n);";

export const storySources = {
  Default,
  WithCustomRootLabel,
  WithCustomLabels,
  WithCustomHref,
  WithNoLink,
  WithSegmentsToSkip,
} as const;

export type StorySourceName = keyof typeof storySources;
