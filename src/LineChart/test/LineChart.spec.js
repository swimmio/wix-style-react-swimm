import React from 'react';
import { createRendererWithUniDriver, cleanup } from '../../../test/utils/unit';

import LineChart from '../LineChart';
import { lineChartPrivateDriverFactory } from './LineChart.private.uni.driver';

describe(LineChart.displayName, () => {
  const render = createRendererWithUniDriver(lineChartPrivateDriverFactory);

  afterEach(cleanup);
});
