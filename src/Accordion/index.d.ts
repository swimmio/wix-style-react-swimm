import * as React from 'react';
import { AccordionItemProps } from './AccordionItem';

export interface AccordionProps {
  dataHook?: string;
  multiple?: boolean;
  items?: AccordionItemProps[];
  skin?: AccordionItemProps['skin'];
  hideShadow?: AccordionItemProps['hideShadow'];
}

export default class Accordion extends React.Component<AccordionProps> {}
