// This file is generated. Do not edit manually.
// Source: src/ui/FormControl/FormControl.stories.tsx

export const WithTextInput = () => "export const WithTextInput = () => (\n  <FormControl>\n    <FormControlLabel label=\"Adresse email\" />\n    <TextInput placeholder=\"jean@exemple.fr\" keyboardType=\"email-address\" />\n    <FormControlHint hint=\"Votre email professionnel\" />\n  </FormControl>\n);";

export const WithError = () => "export const WithError = () => (\n  <FormControl>\n    <FormControlLabel label=\"Adresse email\" error=\"Format invalide\" />\n    <TextInput placeholder=\"jean@exemple.fr\" />\n    <FormControlCaption error=\"Format invalide\" />\n  </FormControl>\n);";

export const WithSuccess = () => "export const WithSuccess = () => (\n  <FormControl>\n    <FormControlLabel label=\"Adresse email\" success=\"Email valide\" />\n    <TextInput placeholder=\"jean@exemple.fr\" />\n    <FormControlCaption success=\"Email valide\" />\n  </FormControl>\n);";

export const Multiline = () => "export const Multiline = () => (\n  <FormControl>\n    <FormControlLabel label=\"Message\" />\n    <TextInput placeholder=\"Votre message...\" multiline numberOfLines={4} />\n  </FormControl>\n);";

export const MultilineWithModal = () => "export const MultilineWithModal = () => {\n  const [text, setText] = useState('');\n  return (\n    <FormControl>\n      <FormControlLabel label=\"Description\" />\n      <TextInput\n        value={text}\n        onChangeText={setText}\n        placeholder=\"Taper pour ouvrir la modale de saisie...\"\n        multiline\n        openModal\n        modalSubmitLabel=\"Confirmer\"\n      />\n    </FormControl>\n  );\n};";

export const Label = () => "export const Label = () => (\n  <Box display=\"flex\" flexDirection=\"column\" gap={8}>\n    <FormControlLabel label=\"Label par defaut\" />\n    <FormControlLabel label=\"Desactive\" disabled />\n    <FormControlLabel label=\"Erreur\" error=\"Message erreur\" />\n    <FormControlLabel label=\"Succes\" success=\"Message succes\" />\n    <FormControlLabel label=\"Avec badge\" labelRight={<Typography>Optionnel</Typography>} />\n  </Box>\n);";

export const Caption = () => "export const Caption = () => (\n  <Box display=\"flex\" flexDirection=\"column\" gap={8}>\n    <FormControlCaption error=\"Champ requis\" />\n    <FormControlCaption success=\"Valeur correcte\" />\n  </Box>\n);";

export const Hint = () => "export const Hint = () => (\n  <Box display=\"flex\" flexDirection=\"column\" gap={8}>\n    <FormControlHint hint=\"Texte descriptif du champ\" />\n    <FormControlHint hint=\"Texte desactive\" disabled />\n  </Box>\n);";

export const Modal = () => "export const Modal = () => {\n  const [open, setOpen] = useState(false);\n  return (\n    <Box>\n      <Button variant=\"secondary\" title=\"Ouvrir la modale\" onPress={() => setOpen(true)} />\n      <FormControlModal\n        open={open}\n        onClose={() => setOpen(false)}\n        submitLabel=\"Valider\"\n        onSubmit={() => setOpen(false)}\n      >\n        <TextInput placeholder=\"Saisir un texte...\" multiline numberOfLines={6} />\n      </FormControlModal>\n    </Box>\n  );\n};";

export const NumberInput = () => "export const NumberInput = () => {\n  const [value, setValue] = useState<number | null>(null);\n  return (\n    <Box display=\"flex\" flexDirection=\"column\" gap={12}>\n      <FormControl>\n        <FormControlLabel label=\"Montant\" />\n        <FormControlNumberInput value={value} onChange={setValue} placeholder=\"0\" />\n      </FormControl>\n      <FormControl>\n        <FormControlLabel label=\"Avec unites\" />\n        <FormControlNumberInput\n          value={value}\n          onChange={setValue}\n          startAdornment={\n            <Box style={{ paddingLeft: 8, paddingRight: 4 }}>\n              <Typography>€</Typography>\n            </Box>\n          }\n          endAdornment={\n            <Box style={{ paddingLeft: 4, paddingRight: 8 }}>\n              <Typography>TTC</Typography>\n            </Box>\n          }\n        />\n      </FormControl>\n      <FormControl>\n        <FormControlLabel label=\"Desactive\" />\n        <FormControlNumberInput value={42} onChange={() => {}} disabled />\n      </FormControl>\n    </Box>\n  );\n};";

export const DateInput = () => "export const DateInput = () => {\n  const [date, setDate] = useState('');\n  const [time, setTime] = useState('');\n  const [month, setMonth] = useState('');\n  return (\n    <Box display=\"flex\" flexDirection=\"column\" gap={12}>\n      <FormControl>\n        <FormControlLabel label=\"Date\" />\n        <FormControlDateInput type=\"date\" value={date} onChange={setDate} />\n      </FormControl>\n      <FormControl>\n        <FormControlLabel label=\"Heure\" />\n        <FormControlDateInput type=\"time\" value={time} onChange={setTime} />\n      </FormControl>\n      <FormControl>\n        <FormControlLabel label=\"Mois\" />\n        <FormControlDateInput type=\"month\" value={month} onChange={setMonth} />\n      </FormControl>\n    </Box>\n  );\n};";

export const FileInput = () => "export const FileInput = () => {\n  const [file, setFile] = useState<FormControlFileInputValue>(null);\n  return (\n    <Box display=\"flex\" flexDirection=\"column\" gap={12}>\n      <FormControl>\n        <FormControlLabel label=\"Piece jointe\" />\n        <FormControlFileInput value={file} onChange={setFile} />\n      </FormControl>\n      <FormControl>\n        <FormControlLabel label=\"Plusieurs fichiers\" />\n        <FormControlFileInput value={file} onChange={setFile} multiple />\n      </FormControl>\n      <FormControl>\n        <FormControlLabel label=\"Desactive\" disabled />\n        <FormControlFileInput value={null} onChange={() => {}} disabled />\n      </FormControl>\n    </Box>\n  );\n};";

export const OtpInput = () => "export const OtpInput = () => {\n  const [code, setCode] = useState('');\n  return (\n    <FormControl>\n      <FormControlLabel label=\"Code de verification\" />\n      <FormControlOtpInput numberOfDigits={6} onTextChange={setCode} />\n      {code.length === 6 && <FormControlCaption success={`Code saisi : ${code}`} />}\n    </FormControl>\n  );\n};";

export const storySources = {
  WithTextInput,
  WithError,
  WithSuccess,
  Multiline,
  MultilineWithModal,
  Label,
  Caption,
  Hint,
  Modal,
  NumberInput,
  DateInput,
  FileInput,
  OtpInput,
} as const;

export type StorySourceName = keyof typeof storySources;
