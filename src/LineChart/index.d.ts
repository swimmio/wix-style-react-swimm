import * as React from 'react';

export interface LineChartProps {
  dataHook?: string;
  className?: string;
  buttonText?: string;
}

export default class LineChart extends React.PureComponent<LineChartProps>{}
