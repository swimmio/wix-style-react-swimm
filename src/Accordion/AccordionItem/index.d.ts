import * as React from 'react';

export interface AccordionItemProps {
  title?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  expandLabel?: React.ReactNode;
  collapseLabel?: React.ReactNode;
  buttonType?: AccordionItemButtonType;
  skin?: 'light' | 'standard';
  className?: string;
  hideShadow?: boolean;
  open?: boolean;
  initiallyOpen?: boolean;
  disabled?: boolean;
  onToggle?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
}

export type AccordionItemButtonType = 'textButton' | 'button';

export default class AccordionItem extends React.Component<
  AccordionItemProps
> {}
