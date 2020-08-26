import * as React from 'react';
import { MoveByOffset } from '../common';
import {
  DropdownLayoutValueOption,
  DropdownLayoutProps,
} from '../DropdownLayout';
import { PopoverProps } from '../Popover';

export interface DropdownBaseProps {
  dataHook?: string;
  open?: boolean;
  placement?: PopoverProps['placement'];
  appendTo?: string | React.ReactNode;
  showArrow?: boolean;
  onClickOutside?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onSelect?: (option: DropdownLayoutValueOption) => void;
  dynamicWidth?: boolean;
  minWidth?: number;
  maxWidth?: number;
  maxHeight?: number | string;
  children?: DropdownBaseChildrenFn;
  options?: DropdownLayoutProps['options'];
  selectedId?: string | number;
  overflow?: string;
  tabIndex?: number;
  initialSelectedId?: string | number;
  zIndex?: number;
  moveBy?: MoveByOffset;
  flip?: boolean;
  fixed?: boolean;
  fluid?: boolean;
  animate?: boolean;
  focusOnSelectedOption?: boolean;
}

export default class DropdownBase extends React.PureComponent<
  DropdownBaseProps
> {}

export type DropdownBaseChildrenFn = React.ReactNode | ChildrenFnArgs;
export type ChildrenFnArgs = (data: {
  open: () => void;
  close: (e: React.SyntheticEvent) => void;
  toggle: () => void;
  delegateKeyDown: React.KeyboardEventHandler;
  selectedOption: DropdownLayoutValueOption;
}) => React.ReactNode;
