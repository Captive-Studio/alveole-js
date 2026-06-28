import React from 'react';
import { Box } from '../../core';
import { useStyles } from './Header.styles';

export type HeaderProps = {
  /** Contenu affiché à gauche (logo, titre, etc.) */
  left?: React.ReactNode;
  /** Contenu libre affiché à droite (navigation, boutons, etc.) */
  right?: React.ReactNode;
};

export const Header = ({ left, right }: HeaderProps) => {
  const styles = useStyles();

  return (
    <Box tag="header" style={styles.container}>
      <Box style={styles.inner}>
        {left != null && <Box style={styles.left}>{left}</Box>}
        {right != null && <Box style={styles.right}>{right}</Box>}
      </Box>
    </Box>
  );
};
