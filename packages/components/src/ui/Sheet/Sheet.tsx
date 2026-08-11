import { Box, Typography } from '@/src/core';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sheet as TamaguiSheet, SheetProps as TamaguiSheetProps } from 'tamagui';
import { ButtonIcon } from '../Button';
import { Divider } from '../Divider';
import { useStyles } from './Sheet.styles';

export type SheetProps = React.PropsWithChildren<{
  open: TamaguiSheetProps['open'];
  title: string;
  points: TamaguiSheetProps['snapPoints'];
  action?: React.ReactNode | undefined;
  setOpen: (value: boolean) => void;
}>;

export const Sheet = (props: SheetProps) => {
  const { children, open, title, points, action, setOpen } = props;

  const [position, setPosition] = React.useState(0);

  const styles = useStyles();

  const { bottom } = useSafeAreaInsets();

  return (
    <Box tag="sheet" style={styles.container}>
      <TamaguiSheet
        modal
        forceRemoveScrollEnabled={open}
        open={open}
        onOpenChange={setOpen}
        snapPoints={points}
        snapPointsMode={'percent'}
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
        animation="medium"
      >
        <TamaguiSheet.Overlay style={styles.overlay} />
        <TamaguiSheet.Frame style={styles.frame}>
          <TamaguiSheet.Handle style={styles.handle} />

          <Box tag="sheet-header" style={styles.header}>
            <Box>
              <ButtonIcon icon="X" variant="tertiary" size="lg" onPress={() => setOpen(false)} />
            </Box>

            <Box flex={1}>
              <Typography style={styles.title}>{title}</Typography>
            </Box>

            {action && (
              <Box mt={'auto'} mb={'auto'}>
                {action}
              </Box>
            )}
          </Box>

          <Divider ml={'2W'} mr={'2W'} />

          <Box tag="sheet-content" style={styles.content} pb={bottom}>
            {children}
          </Box>
        </TamaguiSheet.Frame>
      </TamaguiSheet>
    </Box>
  );
};
