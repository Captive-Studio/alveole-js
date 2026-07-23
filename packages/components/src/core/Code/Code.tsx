import { useTheme } from '@alveole/theme';
import { Typography } from '../Typography';
import { useStyles } from './Code.styles';

export type CodeProps = {
  children: React.ReactNode;
};

export const Code = ({ children }: CodeProps) => {
  const { text } = useTheme();
  const styles = useStyles();
  return (
    <Typography tag="code" style={[text['Corps de texte'].SM.Regular, styles.code]}>
      {children}
    </Typography>
  );
};
