import { lineChartDriverFactory as publicDriverFactory } from '../LineChart.uni.driver';

export const lineChartPrivateDriverFactory = (base, body) => {
  return {
    ...publicDriverFactory(base, body),

    // Add here driver methods that considered "private"
  };
};
