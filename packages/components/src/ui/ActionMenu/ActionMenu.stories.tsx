import React from 'react';
import { Platform, ScrollView } from 'react-native';
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

type FilterId = 'epic' | 'type' | 'filtresRapides';

export const Filters = () => {
  const filters: { id: FilterId; title: string; options: string[]; multi?: boolean }[] = [
    { id: 'epic', title: 'Epic', options: ['Refonte design', 'Onboarding', 'Facturation'] },
    { id: 'type', title: 'Type', options: ['Bug', 'Story', 'Tâche'] },
    {
      id: 'filtresRapides',
      title: 'Filtres rapides',
      options: ['Assigné à moi', 'En cours', 'En retard'],
      multi: true,
    },
  ];

  const [openId, setOpenId] = React.useState<FilterId | null>(null);
  const [singleSelected, setSingleSelected] = React.useState<Partial<Record<FilterId, string>>>({});
  const [multiSelected, setMultiSelected] = React.useState<Partial<Record<FilterId, string[]>>>({});

  return (
    <ScrollView
      horizontal
      nestedScrollEnabled
      directionalLockEnabled={Platform.OS === 'ios'}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexDirection: 'row', gap: 8, paddingHorizontal: 16 }}
    >
      {filters.map(filter => {
        const isOpen = openId === filter.id;
        const hasSelection = filter.multi
          ? (multiSelected[filter.id]?.length ?? 0) > 0
          : singleSelected[filter.id] != null;

        return (
          <ActionMenu
            key={filter.id}
            placement="bottom-start"
            scrollable={false}
            open={isOpen}
            setOpen={open => setOpenId(open ? filter.id : null)}
            renderTrigger={() => (
              <Button
                variant="secondary"
                title={filter.title}
                endIcon="ChevronDown"
                size="sm"
                selected={hasSelection}
                active={isOpen}
              />
            )}
          >
            {filter.options.map(option => {
              const isSelected = filter.multi
                ? (multiSelected[filter.id] ?? []).includes(option)
                : singleSelected[filter.id] === option;

              return (
                <ActionMenu.Item
                  key={option}
                  title={option}
                  selected={isSelected}
                  onPress={() => {
                    if (filter.multi) {
                      setMultiSelected(prev => {
                        const current = prev[filter.id] ?? [];
                        return {
                          ...prev,
                          [filter.id]: current.includes(option)
                            ? current.filter(o => o !== option)
                            : [...current, option],
                        };
                      });
                    } else {
                      setSingleSelected(prev => ({
                        ...prev,
                        [filter.id]: prev[filter.id] === option ? undefined : option,
                      }));
                      setOpenId(null);
                    }
                  }}
                />
              );
            })}
          </ActionMenu>
        );
      })}
    </ScrollView>
  );
};

export * as Sources from './ActionMenu.stories.sources';
