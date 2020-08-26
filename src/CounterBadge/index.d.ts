import * as React from 'react';
export type CounterBadgeSkin =
  | 'general'
  | 'standard'
  | 'danger'
  | 'warning'
  | 'urgent'
  | 'success';

export interface CounterBadgeProps {
  dataHook?: string;
  className?: string;
  skin?: CounterBadgeSkin;
  showTooltip?: boolean;
}

export default class CounterBadge extends React.PureComponent<
  CounterBadgeProps
> {}
