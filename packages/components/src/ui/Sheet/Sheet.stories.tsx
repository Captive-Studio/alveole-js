import { Box, Button, Story, Typography } from '@alveole/components';
import { useState } from 'react';
import { Sheet } from './Sheet';
import { useStyles } from './Sheet.styles';

export default {
  title: 'Sheet',
  tags: ['ui'],
  experimental: true,
  description: 'Bottom sheet modal',
  component: Sheet,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Button title="Ouvrir la modal" variant="primary" onPress={() => setOpen(true)} />
      </Box>

      <Sheet open={open} setOpen={setOpen} points={[80, 25]} title="Titre">
        <Typography>Children</Typography>
      </Sheet>
    </>
  );
};

export const WithAction = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Button title="Ouvrir la modal" variant="primary" onPress={() => setOpen(true)} />
      </Box>

      <Sheet
        open={open}
        setOpen={setOpen}
        points={[50]}
        title="Titre"
        action={<Button title="Action" variant="tertiary" size="sm" />}
      >
        <Typography>Children</Typography>
      </Sheet>
    </>
  );
};

export * as Sources from './Sheet.stories.sources';
