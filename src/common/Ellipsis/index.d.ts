import { TooltipCommonProps } from '../../common';
import * as React from 'react';

// Common
type EllipsisCommonProps = {
  ellipsis?: boolean;
  showTooltip?: boolean;
  wrapperClassName?: string;
};

// Ellipsis
export type EllipsisProps = EllipsisCommonProps & TooltipCommonProps;

type RenderProps<T> = {
  ref: any; // TODO - React.RefObject<T>,
  ellipsisClasses: (className?: string) => string;
};

interface IEllipsisProps extends EllipsisProps {
  render<T>(renderProps: RenderProps<T>): React.ReactElement;
}
export default class Ellipsis extends React.PureComponent<IEllipsisProps> {}

// Extract
export function extractEllipsisProps<T>(
  props: T & EllipsisCommonProps,
): { ellipsisProps: T; componentProps: EllipsisProps };
