import * as React from 'react';
import Tabs from '..';
import { tabsTestkitFactory } from '../../../testkit';
import { tabsTestkitFactory as tabsEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { tabsTestkitFactory as tabsPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function TabsWithMandatoryProps() {
  return <Tabs items={[{ id: 1, title: 'tab1', dataHook: 'tab-hook' }]} />;
}

function TabsWithAllProps() {
  return (
    <Tabs
      dataHook="hook"
      className="className"
      activeId="12"
      hasDivider
      minWidth={11}
      type="compactSide"
      size="medium"
      sideContent={<div />}
      width={500}
      onClick={tab => {}}
      items={[{ id: 1, title: 'tab1', dataHook: 'tab-hook' }]}
    />
  );
}

async function testkits() {
  const testkit = tabsTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = tabsEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await tabsPuppeteerTestkitFactory({
    dataHook: 'hook',
    page,
  });
}
