import { useState } from 'react';
import { Box, Typography } from '../../core';
import { Story } from '../../type';
import { Button } from '../Button';
import { FormControl } from './FormControl';
import { useStyles } from './FormControl.styles';
import { FormControlCaption } from './FormControlCaption';
import { FormControlDateInput } from './FormControlDateInput';
import { FormControlFileInput, FormControlFileInputValue } from './FormControlFileInput';
import { FormControlHint } from './FormControlHint';
import { FormControlLabel } from './FormControlLabel';
import { FormControlModal } from './FormControlModal';
import { FormControlNumberInput } from './FormControlNumberInput';
import { FormControlOtpInput } from './FormControlOtpInput';
import { TextInput } from './TextInput';

export default {
  title: 'FormControl',
  tags: ['core'],
  experimental: false,
  description: 'Eléments de construction de champs de saisie (label, input, helper text).',
  component: FormControl,
  styleFn: useStyles,
} satisfies Story;

export const WithTextInput = () => (
  <FormControl>
    <FormControlLabel label="Adresse email" />
    <TextInput placeholder="jean@exemple.fr" keyboardType="email-address" />
    <FormControlHint hint="Votre email professionnel" />
  </FormControl>
);

export const WithError = () => (
  <FormControl>
    <FormControlLabel label="Adresse email" error="Format invalide" />
    <TextInput placeholder="jean@exemple.fr" />
    <FormControlCaption error="Format invalide" />
  </FormControl>
);

export const WithSuccess = () => (
  <FormControl>
    <FormControlLabel label="Adresse email" success="Email valide" />
    <TextInput placeholder="jean@exemple.fr" />
    <FormControlCaption success="Email valide" />
  </FormControl>
);

export const Multiline = () => (
  <FormControl>
    <FormControlLabel label="Message" />
    <TextInput placeholder="Votre message..." multiline numberOfLines={4} />
  </FormControl>
);

export const MultilineWithModal = () => {
  const [text, setText] = useState('');
  return (
    <FormControl>
      <FormControlLabel label="Description" />
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Taper pour ouvrir la modale de saisie..."
        multiline
        openModal
        modalSubmitLabel="Confirmer"
      />
    </FormControl>
  );
};

export const Label = () => (
  <Box display="flex" flexDirection="column" gap={8}>
    <FormControlLabel label="Label par defaut" />
    <FormControlLabel label="Desactive" disabled />
    <FormControlLabel label="Erreur" error="Message erreur" />
    <FormControlLabel label="Succes" success="Message succes" />
    <FormControlLabel label="Avec badge" labelRight={<Typography>Optionnel</Typography>} />
  </Box>
);

export const Caption = () => (
  <Box display="flex" flexDirection="column" gap={8}>
    <FormControlCaption error="Champ requis" />
    <FormControlCaption success="Valeur correcte" />
  </Box>
);

export const Hint = () => (
  <Box display="flex" flexDirection="column" gap={8}>
    <FormControlHint hint="Texte descriptif du champ" />
    <FormControlHint hint="Texte desactive" disabled />
  </Box>
);

export const Modal = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Button variant="secondary" title="Ouvrir la modale" onPress={() => setOpen(true)} />
      <FormControlModal
        open={open}
        onClose={() => setOpen(false)}
        submitLabel="Valider"
        onSubmit={() => setOpen(false)}
      >
        <TextInput placeholder="Saisir un texte..." multiline numberOfLines={6} />
      </FormControlModal>
    </Box>
  );
};

export const NumberInput = () => {
  const [value, setValue] = useState<number | null>(null);
  return (
    <Box display="flex" flexDirection="column" gap={12}>
      <FormControl>
        <FormControlLabel label="Montant" />
        <FormControlNumberInput value={value} onChange={setValue} placeholder="0" />
      </FormControl>
      <FormControl>
        <FormControlLabel label="Avec unites" />
        <FormControlNumberInput
          value={value}
          onChange={setValue}
          startAdornment={
            <Box style={{ paddingLeft: 8, paddingRight: 4 }}>
              <Typography>€</Typography>
            </Box>
          }
          endAdornment={
            <Box style={{ paddingLeft: 4, paddingRight: 8 }}>
              <Typography>TTC</Typography>
            </Box>
          }
        />
      </FormControl>
      <FormControl>
        <FormControlLabel label="Desactive" />
        <FormControlNumberInput value={42} onChange={() => {}} disabled />
      </FormControl>
    </Box>
  );
};

export const DateInput = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [month, setMonth] = useState('');
  return (
    <Box display="flex" flexDirection="column" gap={12}>
      <FormControl>
        <FormControlLabel label="Date" />
        <FormControlDateInput type="date" value={date} onChange={setDate} />
      </FormControl>
      <FormControl>
        <FormControlLabel label="Heure" />
        <FormControlDateInput type="time" value={time} onChange={setTime} />
      </FormControl>
      <FormControl>
        <FormControlLabel label="Mois" />
        <FormControlDateInput type="month" value={month} onChange={setMonth} />
      </FormControl>
    </Box>
  );
};

export const FileInput = () => {
  const [file, setFile] = useState<FormControlFileInputValue>(null);
  return (
    <Box display="flex" flexDirection="column" gap={12}>
      <FormControl>
        <FormControlLabel label="Piece jointe" />
        <FormControlFileInput value={file} onChange={setFile} />
      </FormControl>
      <FormControl>
        <FormControlLabel label="Plusieurs fichiers" />
        <FormControlFileInput value={file} onChange={setFile} multiple />
      </FormControl>
      <FormControl>
        <FormControlLabel label="Desactive" disabled />
        <FormControlFileInput value={null} onChange={() => {}} disabled />
      </FormControl>
    </Box>
  );
};

export const OtpInput = () => {
  const [code, setCode] = useState('');
  return (
    <FormControl>
      <FormControlLabel label="Code de verification" />
      <FormControlOtpInput numberOfDigits={6} onTextChange={setCode} />
      {code.length === 6 && <FormControlCaption success={`Code saisi : ${code}`} />}
    </FormControl>
  );
};

export * as Sources from './FormControl.stories.sources';
