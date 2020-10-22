import * as React from 'react';
import { BadgeSize, BadgeType, BadgeSkin } from '../Badge';
import { PopoverCommonProps } from '../common';

export interface BadgeSelectProps {
  options: BadgeSelectItem[];
  selectedId?: string;
  onSelect?: (option: BadgeSelectItem) => void;
  size?: BadgeSize;
  type?: BadgeType;
  uppercase?: boolean;
  dataHook?: string;
  popoverProps?: PopoverCommonProps;
}

export default class BadgeSelect extends React.Component<BadgeSelectProps> {
  hideDropdown: () => void;
  showDropdown: () => void;
  toggleDropdown: () => void;
  getSelectedOption: (props: any) => BadgeSelectItem;
}

export interface BadgeSelectItem {
  id: string;
  skin: BadgeSkin;
  text: string;
  subtitle?: string;
  ellipsis?: boolean;
  dataHook?: string;
}
