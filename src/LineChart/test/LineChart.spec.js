import React from 'react';
import { createRendererWithUniDriver, cleanup } from '../../../test/utils/unit';

import LineChart from '../LineChart';
import { lineChartPrivateDriverFactory } from './LineChart.private.uni.driver';

describe(LineChart.displayName, () => {
  const render = createRendererWithUniDriver(lineChartPrivateDriverFactory);

  afterEach(() => {
    cleanup();
  });

  it('should render', async () => {
    const { driver } = render(<LineChart />);

    expect(await driver.exists()).toBe(true);
    expect(await driver.getButtonText()).toEqual('Click me!');
  });

  it('should increment', async () => {
    const { driver } = render(<LineChart />);

    await driver.clickButton();
    await driver.clickButton();

    expect(await driver.getCountText()).toEqual(
      'You clicked this button even number (2) of times',
    );
  });

  it('should allow changing the button text', async () => {
    const { driver } = render(<LineChart buttonText="Press me" />);

    expect(await driver.getButtonText()).toEqual('Press me');
  });
});
