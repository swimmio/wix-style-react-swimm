import * as React from 'react';
import SelectorList, { SelectorListItem } from '..';
import { selectorListTestkitFactory } from '../../../testkit';
import { selectorListTestkitFactory as selectorListEnzymeTestkitFactory } from '../../../testkit/enzyme';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';
import { selectorListTestkitFactory as selectorListPuppeteerTestkitFactory } from '../../../testkit/puppeteer';

function SelectorListWithMandatoryProps() {
  return (
    <SelectorList
      dataSource={(_searchQuery, _number, _limit) =>
        Promise.resolve({ items: [], totalCount: 0 })
      }
    />
  );
}

function SelectorListWithAllProps() {
  return (
    <SelectorList
      dataSource={(_searchQuery, _number, _limit) =>
        Promise.resolve({
          items: [
            {
              id: 1,
              title: <div />,
              subtitle: 'test',
              subtitleNode: <div />,
              extraText: 'test',
              extraNode: <div />,
              disabled: true,
              selected: true,
              image: <div />,
              belowNode: <div />,
              showBelowNodeOnSelect: true,
            },
          ],
          totalCount: 0,
        })
      }
      emptyState={<div />}
      dataHook="hook"
      height="10px"
      imageShape="circle"
      imageSize="cinema"
      itemsPerPage={10}
      maxHeight="15px"
      multiple
      renderNoResults={_searchValue => <div />}
      searchDebounceMs={1000}
      searchPlaceholder="placeholder"
      withSearch
      onSelect={_item => {}}
    />
  );
}

function ShouldSupportMultipleItemsSelection() {
  return (
    <SelectorList
      dataSource={(_searchQuery, _number, _limit) =>
        Promise.resolve({ items: [], totalCount: 0 })
      }
      emptyState={<div />}
      multiple
    />
  );
}

function ShouldSupportSingleSelection() {
  return (
    <SelectorList
      dataSource={(_searchQuery, _number, _limit) =>
        Promise.resolve({ items: [], totalCount: 0 })
      }
      emptyState={<div />}
      multiple={false}
    />
  );
}

async function testkits() {
  const testkit = selectorListTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = selectorListEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await selectorListPuppeteerTestkitFactory({
    dataHook: 'hook',
    page,
  });
}
