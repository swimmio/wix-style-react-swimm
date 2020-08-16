import * as React from 'react';
import LineChart from '..';
import { lineChartTestkitFactory } from '../../../testkit';
import { lineChartTestkitFactory as lineChartEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { lineChartTestkitFactory as lineChartPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function lineChartWithMandatoryProps() {
  return <LineChart />;
}

function lineChartWithAllProps() {
  return (
    <LineChart
      dataHook="dataHook"
      className="className"
      buttonText="buttonText"
    />
  );
}

async function testkits() {
  const testkit = lineChartTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = lineChartEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await lineChartPuppeteerTestkitFactory({
    dataHook: 'hook',
    page,
  });
}
