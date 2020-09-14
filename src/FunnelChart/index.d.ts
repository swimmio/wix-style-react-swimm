import * as React from 'react';

export interface FunnelChartItem {
  value?: number;
  label: string
}

type percentageDifferenceCbData = {
  currentItem: FunnelChartItem, nextItem: FunnelChartItem, difference: string
}

export interface FunnelChartProps {
  dataHook?: string;
  className?: string;
  data: FunnelChartItem[];
  hideDifferenceBadge?: boolean;
  differenceBadgeTooltipContent?: ({currentItem, nextItem, difference}: percentageDifferenceCbData) => string,
  onDifferenceBadgeTooltipShow?: ({currentItem: nextItem, difference}: percentageDifferenceCbData) => void,
}

export default class FunnelChart extends React.PureComponent<FunnelChartProps>{}
