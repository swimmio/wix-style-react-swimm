import * as React from 'react';

type item = {
  label: string;
  values: number[];
};

export interface StackedBarChartProps {
  dataHook?: string;
  className?: string;
  data?: item[];
  tooltipTemplate?: (item: item) => React.ReactNode;
}

export default class StackedBarChart extends React.PureComponent<
  StackedBarChartProps
> {}
