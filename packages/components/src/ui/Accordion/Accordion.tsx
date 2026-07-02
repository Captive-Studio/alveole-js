import React from 'react';
import { Accordion as TamaguiAccordion } from 'tamagui';
import { useStyles } from './Accordion.styles';

export type AccordionMultipleProps = {
  type: 'multiple';
  value?: string[];
  onValueChange?: (value: string[]) => void;
};

export type AccordionSingleProps = {
  type: 'single';
  value?: string;
  onValueChange?: (value: string) => void;
};

export type AccordionProps = {
  variant?: 'default' | 'rounded';
  color?: 'default' | 'light';
  collapsible?: boolean;
  children: React.ReactNode;
} & (AccordionMultipleProps | AccordionSingleProps);

export const Accordion = (props: AccordionProps) => {
  const { children, ...accordionProps } = props;

  const styles = useStyles();

  const colorStyle = props.color === 'light' ? styles.accordionLight : styles.accordionDefault;

  const variantStyle = props.variant === 'rounded' ? styles.accordionRounded : {};

  return (
    <TamaguiAccordion style={{ ...styles.accordion, ...variantStyle, ...colorStyle }} {...accordionProps}>
      {children}
    </TamaguiAccordion>
  );
};
