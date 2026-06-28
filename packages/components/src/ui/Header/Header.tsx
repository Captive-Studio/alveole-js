import React from 'react';
import { Box, Typography } from '../../core';
import { useStyles } from './Header.styles';

export type HeaderProps = {
  /** Logo carré affiché à gauche. */
  logo: React.ReactNode;
  /** Titre de l'application affiché à côté du logo. */
  title: string;
  /** Contenu libre affiché à droite (navigation, boutons, etc.). */
  right?: React.ReactNode;
};

export const Header = ({ logo, title, right }: HeaderProps) => {
  const styles = useStyles();

  return (
    <Box tag="header" style={styles.container}>
      <Box style={styles.inner}>
        <Box style={styles.identity}>
          {logo}
          <Typography style={styles.titleText}>{title}</Typography>
        </Box>
        {right != null && <Box style={styles.right}>{right}</Box>}
      </Box>
    </Box>
  );
};
