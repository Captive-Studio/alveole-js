import React from 'react';
import { Autocomplete, AutocompleteOption, AutocompleteProps } from '../Autocomplete';

export type AutocompleteAddressValue = {
  placeId?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  custom?: boolean;
};

export type AutocompleteAddressProps = {
  value?: AutocompleteProps['value'];
  suggestions?: AutocompleteOption[];
  disabledCreation?: boolean;
  label?: string;
  error?: string;
  onSearchChange?: (query: string) => void;
  /** Appelé avec l'id de lieu quand l'utilisateur sélectionne une suggestion */
  onPlaceSelected?: (placeId: string) => void;
  /** Appelé avec une adresse personnalisée quand l'utilisateur crée une option */
  onCustomAddress?: (address: string) => void;
  /** Appelé avec null quand la sélection est effacée */
  onClear?: () => void;
};

export const AutocompleteAddress = (props: AutocompleteAddressProps) => {
  const {
    value,
    disabledCreation,
    error,
    label,
    suggestions = [],
    onSearchChange,
    onPlaceSelected,
    onCustomAddress,
    onClear,
  } = props;

  const uniqueId = React.useId();

  const options = suggestions.length > 0 ? suggestions : (value ?? []);

  return (
    <Autocomplete
      key={`autocomplete-address--${value?.map(v => v.value).join(',')}-${uniqueId}`}
      allowCreate={disabledCreation !== true}
      disabledFilterSearch
      isMulti={false}
      label={label ?? 'Adresse'}
      placeholder="ex : 3 rue Robespierre"
      options={options}
      value={value}
      error={error}
      onSearchChange={onSearchChange}
      onChange={selected => {
        const place = selected[0];

        if (!place) {
          onClear?.();
          return;
        }

        if (place.__created) {
          onCustomAddress?.(place.label);
          return;
        }

        onPlaceSelected?.(place.value);
      }}
    />
  );
};
