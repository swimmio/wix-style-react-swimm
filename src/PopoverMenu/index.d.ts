import * as React from 'react';
import { MoveByOffset } from '../common';
import {
  AppendTo,
  Placement,
} from 'wix-ui-core/dist/src/components/popover/Popover.d';
import { DropdownBaseProps } from '../DropdownBase';

export interface PopoverMenuProps {
  triggerElement: React.ReactNode;
  children?: React.ReactNode;
  maxWidth?: DropdownBaseProps['maxWidth'];
  minWidth?: DropdownBaseProps['minWidth'];
  zIndex?: number;
  moveBy?: MoveByOffset;
  placement?: Placement;
  textSize?: 'small' | 'medium';
  appendTo?: AppendTo;
  flip?: boolean;
  fixed?: boolean;
  showArrow?: boolean;
  wrapText?: boolean;
  dataHook?: string;
}

export interface PopoverMenuItemProps {
  text?: React.ReactNode;
  onClick?: () => any;
  skin?: 'dark' | 'destructive';
  prefixIcon?: React.ReactNode;
  dataHook?: string;
  disabled?: boolean;
}

export interface PopoverMenuDividerProps {
  dataHook?: string;
}

export default class PopoverMenu<
  T extends PopoverMenuProps
> extends React.PureComponent<T> {
  static MenuItem: (props?: PopoverMenuItemProps) => React.ReactElement;
  static Divider: (props?: PopoverMenuDividerProps) => React.ReactElement;
}
