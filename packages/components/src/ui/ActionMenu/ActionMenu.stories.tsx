import React from 'react';
import { Box } from '../../core';
import type { Story } from '../../type/Story';
import { Button } from '../Button';
import { ActionMenu } from './ActionMenu';

export default {
  title: 'ActionMenu',
  tags: ['ui'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Composants?node-id=1002-547',
  description: "Menu contextuel affichant une liste d'actions sous forme de liste de liens.",
  component: ActionMenu,
  styleFn: () => '',
} satisfies Story;

export const Default = () => {
  const alignments = [
    'top',
    'right',
    'bottom',
    'left',
    'top-start',
    'top-end',
    'right-start',
    'right-end',
    'bottom-start',
    'bottom-end',
    'left-start',
    'left-end',
  ] as const;

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap="1W"
      flexDirection="row"
      justify-content="center"
      align-items="center"
      width="100%"
    >
      {alignments.map(alignment => (
        <ActionMenu
          key={alignment}
          placement={alignment}
          renderTrigger={() => <Button variant="secondary" title={alignment} />}
        >
          <ActionMenu.Item title="Contenu de l'action menu" icon="Settings" selected />
          <ActionMenu.Item title="Contenu de l'action menu" icon="Copy" />
          <ActionMenu.Item title="Contenu de l'action menu" icon="Trash" />
        </ActionMenu>
      ))}
    </Box>
  );
};

export const Filters = () => {
  const epics = ['Refonte design', 'Onboarding', 'Facturation'];
  const types = ['Bug', 'Story', 'Tâche'];
  const filtresRapides = ['Assigné à moi', 'En cours', 'En retard'];

  const [epicFilter, setEpicFilter] = React.useState<string | null>(null);
  const [typeFilter, setTypeFilter] = React.useState<string | null>(null);
  const [filtresRapidesFilter, setFiltresRapidesFilter] = React.useState<string[]>([]);

  return (
    <Box display="flex" flexDirection="row" gap="2" align-items="center">
      <ActionMenu
        placement="bottom-start"
        scrollable={false}
        renderTrigger={() => (
          <Button variant="secondary" title="Epic" endIcon="ChevronDown" selected={epicFilter !== null} />
        )}
      >
        <ActionMenu.Item title="Toutes les épics" selected={epicFilter === null} onPress={() => setEpicFilter(null)} />
        {epics.map(epic => (
          <ActionMenu.Item
            key={epic}
            title={epic}
            selected={epicFilter === epic}
            onPress={() => setEpicFilter(epicFilter === epic ? null : epic)}
          />
        ))}
      </ActionMenu>

      <ActionMenu
        placement="bottom-start"
        scrollable={false}
        renderTrigger={() => (
          <Button variant="secondary" title="Type" endIcon="ChevronDown" selected={typeFilter !== null} />
        )}
      >
        <ActionMenu.Item title="Tous les types" selected={typeFilter === null} onPress={() => setTypeFilter(null)} />
        {types.map(type => (
          <ActionMenu.Item
            key={type}
            title={type}
            selected={typeFilter === type}
            onPress={() => setTypeFilter(typeFilter === type ? null : type)}
          />
        ))}
      </ActionMenu>

      <ActionMenu
        placement="bottom-start"
        scrollable={false}
        renderTrigger={() => (
          <Button
            variant="secondary"
            title="Filtres rapides"
            endIcon="ChevronDown"
            selected={filtresRapidesFilter.length > 0}
          />
        )}
      >
        {filtresRapides.map(filtre => (
          <ActionMenu.Item
            key={filtre}
            title={filtre}
            selected={filtresRapidesFilter.includes(filtre)}
            onPress={() =>
              setFiltresRapidesFilter(prev =>
                prev.includes(filtre) ? prev.filter(f => f !== filtre) : [...prev, filtre],
              )
            }
          />
        ))}
      </ActionMenu>
    </Box>
  );
};

export * as Sources from './ActionMenu.stories.sources';
