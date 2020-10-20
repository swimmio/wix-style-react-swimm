import React from 'react';
import times from '../../utils/operators/times';
import SelectorList from '../SelectorList';
import SelectorListDriverFactory from '../SelectorList.driver';
import { ASSET_PREFIX } from '../../../test/utils';

import {
  cleanup,
  createRendererWithDriver,
  createRendererWithUniDriver,
} from '../../../test/utils/react';
import { SelectorListUniDriverFactory } from '../SelectorList.uni.driver';
import { eventually } from '../../../test/utils/unit';
import Box from '../../Box';

// TODO: remove this hack
// taken from here: https://github.com/facebook/jest/issues/2157#issuecomment-279171856
const flushPromises = () => new Promise(resolve => setImmediate(resolve));

const paginatedDataSourceFactory = (items, timeout) => (
  searchQuery,
  offset,
  limit,
) => {
  const filteredItems = items.filter(({ title }) =>
    title.includes(searchQuery),
  );
  const data = {
    items: filteredItems.slice(offset, offset + limit),
    totalCount: filteredItems.length,
  };
  return timeout
    ? new Promise(resolve => {
        setTimeout(() => resolve(data), timeout);
      })
    : Promise.resolve(data);
};

const paginatedDataSource = paginatedDataSourceFactory(
  times(7, i => ({ id: i, title: `title-${i}`, image: <img /> })),
);

const paginatedDataSourceWithTimeout = paginatedDataSourceFactory(
  times(7, i => ({ id: i, title: `title-${i}`, image: <img /> })),
  100,
);

const emptyDataSource = paginatedDataSourceFactory([]);
const requiredProps = {
  dataSource: emptyDataSource,
};

describe('SelectorList', () => {
  describe('[sync]', () => {
    runTests(createRendererWithDriver(SelectorListDriverFactory));
  });

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(SelectorListUniDriverFactory));
  });

  function runTests(render) {
    afterEach(() => cleanup());
    const createDriver = props =>
      render(<SelectorList {...requiredProps} {...props} />).driver;
    const createDriverWithCheckbox = async props => {
      const element = render(
        <SelectorList {...requiredProps} {...props}>
          {({ renderList, renderToggleAllCheckbox }) => (
            <Box height="500px">
              {renderList()}
              {renderToggleAllCheckbox()}
            </Box>
          )}
        </SelectorList>,
      );
      await flushPromises();
      return element.driver;
    };

    describe('layout', () => {
      it('should show medium loader', async () => {
        jest.useFakeTimers();
        const driver = createDriver({
          dataSource: paginatedDataSourceFactory([], 10),
        });
        expect(await driver.mainLoaderDriver().exists()).toBe(true);
        expect(await driver.mainLoaderDriver().isMedium()).toBe(true);
        await jest.runOnlyPendingTimers();
      });

      it('should hide search while loading', async () => {
        const driver = createDriver();
        expect(await driver.searchDriver().exists()).toBe(false);
      });

      it('should hide the loader & render only passed empty state when there are no items in data source', async () => {
        const driver = createDriver({
          dataSource: emptyDataSource,
          emptyState: <img src="empty_state.png" />,
        });

        await flushPromises();

        expect(await driver.mainLoaderDriver().exists()).toBe(false);
        expect(await driver.showsNoResultsFoundState()).toBe(false);
        expect(await driver.searchDriver().exists()).toBe(false);
        expect(await driver.showsEmptyState()).toBe(true);
        expect(await driver.getEmptyState()).toBeInstanceOf(HTMLImageElement);
        expect((await driver.getEmptyState()).src).toBe(
          `${ASSET_PREFIX}empty_state.png`,
        );
        expect(await driver.listExists()).toBe(false);
      });

      it('should hide loader & render the list of items with images, when there are items in data source', async () => {
        const dataSource = paginatedDataSourceFactory([
          {
            id: 1,
            title: 'rick',
            subtitle: 'sanchez',
            extraText: 'get',
            image: <img src="rick.png" />,
          },
          {
            id: 2,
            title: 'morty',
            subtitle: 'smith',
            extraNode: <img src="shwifty.png" />,
            image: <img src="morty.png" />,
          },
        ]);

        const driver = createDriver({ dataSource });

        await flushPromises();

        expect(await driver.mainLoaderDriver().exists()).toBe(false);
        expect(await driver.showsEmptyState()).toBe(false);
        expect(await driver.listExists()).toBe(true);
        expect(
          await driver
            .getSelectorDriverAt(0)
            .titleTextDriver()
            .getText(),
        ).toBe('rick');
        expect(
          await driver
            .getSelectorDriverAt(0)
            .subtitleTextDriver()
            .getText(),
        ).toBe('sanchez');
        expect(
          (await driver.getSelectorDriverAt(0).getExtraNode()).textContent,
        ).toBe('get');
        expect(await driver.getSelectorDriverAt(0).getImage()).toBeInstanceOf(
          HTMLImageElement,
        );
        expect((await driver.getSelectorDriverAt(0).getImage()).src).toBe(
          `${ASSET_PREFIX}rick.png`,
        );
        expect(
          await driver
            .getSelectorDriverAt(1)
            .titleTextDriver()
            .getText(),
        ).toBe('morty');
        expect(
          await driver
            .getSelectorDriverAt(1)
            .subtitleTextDriver()
            .getText(),
        ).toBe('smith');
        expect(
          await driver.getSelectorDriverAt(1).getExtraNode(),
        ).toBeInstanceOf(HTMLImageElement);
        expect((await driver.getSelectorDriverAt(1).getExtraNode()).src).toBe(
          `${ASSET_PREFIX}shwifty.png`,
        );
        expect(await driver.getSelectorDriverAt(1).getImage()).toBeInstanceOf(
          HTMLImageElement,
        );
        expect((await driver.getSelectorDriverAt(1).getImage()).src).toBe(
          `${ASSET_PREFIX}morty.png`,
        );
      });
    });

    describe('search', () => {
      it('should render search input after the items are loaded', async () => {
        const driver = createDriver({
          dataSource: paginatedDataSource,
        });

        await flushPromises();

        expect(await driver.searchDriver().exists()).toBe(true);
      });

      it('should allow hiding search', async () => {
        const driver = createDriver({
          dataSource: paginatedDataSource,
          withSearch: false,
        });

        await flushPromises();

        expect(await driver.searchDriver().exists()).toBe(false);
      });

      it('should allow passing placeholder', async () => {
        const expectedPlaceholder = 'some placeholder';
        const driver = createDriver({
          dataSource: paginatedDataSource,
          searchPlaceholder: expectedPlaceholder,
        });

        await flushPromises();

        expect(await driver.searchDriver().inputDriver.getPlaceholder()).toBe(
          expectedPlaceholder,
        );
      });

      it('should show medium loader, and then show filtered items', async () => {
        const driver = createDriver({
          dataSource: paginatedDataSource,
        });
        await flushPromises();
        eventually(async () =>
          expect(await driver.mainLoaderDriver().exists()).toBe(true),
        );
        await driver.searchDriver().inputDriver.focus();
        await driver.searchDriver().inputDriver.enterText('title-1');

        await flushPromises();
        await driver.scrollDown();

        await eventually(async () =>
          expect(await driver.mainLoaderDriver().exists()).toBe(false),
        );
        expect(await driver.numberOfItemsInList()).toBe(1);
        expect(
          await driver
            .getSelectorDriverAt(0)
            .titleTextDriver()
            .getText(),
        ).toBe('title-1');
      });

      it('should render noResultsFoundState with current search value only if no results were found', async () => {
        jest.useFakeTimers();
        const searchValue = 'wubba lubba dub dub';
        const driver = createDriver({
          dataSource: paginatedDataSourceWithTimeout,
          renderNoResults: _searchValue => (
            <img alt={_searchValue} src="no-results-found.png" />
          ),
        });

        expect(await driver.showsNoResultsFoundState()).toBe(false);

        await jest.runOnlyPendingTimers();

        expect(await driver.showsNoResultsFoundState()).toBe(false);

        await driver.searchDriver().inputDriver.focus();
        await driver.searchDriver().inputDriver.enterText(searchValue);
        expect(await driver.searchDriver().inputDriver.getValue()).toBe(
          searchValue,
        );
        expect(await driver.showsNoResultsFoundState()).toBe(false);
        await jest.runOnlyPendingTimers();

        expect(await driver.showsNoResultsFoundState()).toBe(true);
        expect(await driver.getNoResultsFoundState()).toBeInstanceOf(
          HTMLImageElement,
        );
        expect((await driver.getNoResultsFoundState()).src).toBe(
          `${ASSET_PREFIX}no-results-found.png`,
        );
        expect((await driver.getNoResultsFoundState()).alt).toBe(searchValue);

        await driver.searchDriver().inputDriver.clickClear();
        await jest.runOnlyPendingTimers();

        expect(await driver.showsNoResultsFoundState()).toBe(false);
      });

      it('should clear search on clear button click', async () => {
        const driver = createDriver({
          dataSource: paginatedDataSource,
        });

        await flushPromises();

        await driver.searchDriver().inputDriver.enterText('foo');
        expect(await driver.searchDriver().inputDriver.getValue()).toBe('foo');

        await driver.searchDriver().inputDriver.clickClear();
        expect(await driver.searchDriver().inputDriver.getValue()).toBe('');
      });

      it('should postpone the search until the timer if debounce is used', async () => {
        jest.useFakeTimers();

        const driver = createDriver({
          dataSource: paginatedDataSourceWithTimeout,
          withSearch: true,
          searchDebounceMs: 100,
        });

        await jest.runOnlyPendingTimers();

        await driver.searchDriver().inputDriver.enterText('f');
        expect(await driver.mainLoaderDriver().exists()).toBe(false);

        jest.advanceTimersByTime(50);

        await driver.searchDriver().inputDriver.enterText('fo');
        expect(await driver.mainLoaderDriver().exists()).toBe(false);

        jest.advanceTimersByTime(50);

        await driver.searchDriver().inputDriver.enterText('foo');
        expect(await driver.mainLoaderDriver().exists()).toBe(false);

        jest.advanceTimersByTime(101);

        const doesExist = await driver.mainLoaderDriver().exists();
        expect(doesExist).toBe(true);
        await jest.runOnlyPendingTimers();
      });

      it('should not postpone the search if debounce is not used', async () => {
        jest.useFakeTimers();

        const driver = createDriver({
          dataSource: paginatedDataSourceWithTimeout,
        });

        await jest.runOnlyPendingTimers();

        await driver.searchDriver().inputDriver.enterText('f');
        expect(await driver.mainLoaderDriver().exists()).toBe(true);

        jest.advanceTimersByTime(50);
        await jest.runOnlyPendingTimers();

        await driver.searchDriver().inputDriver.enterText('fo');
        expect(await driver.mainLoaderDriver().exists()).toBe(true);

        jest.advanceTimersByTime(50);
        await jest.runOnlyPendingTimers();

        await driver.searchDriver().inputDriver.enterText('foo');
        expect(await driver.mainLoaderDriver().exists()).toBe(true);
        await jest.runOnlyPendingTimers();
      });
    });

    describe('pagination', () => {
      it(`should render the first 50 items by default, show a small loader when scrolleasync d down,
    then render the next page and remove the loader`, async () => {
        const dataSource = paginatedDataSourceFactory(
          times(55, i => ({ id: i, title: '', subtitle: '' })),
        );
        const driver = createDriver({ dataSource });

        await flushPromises();

        expect(await driver.numberOfItemsInList()).toBe(50);
        expect(await driver.nextPageLoaderDriver().exists()).toBe(true);
        expect(await driver.nextPageLoaderDriver().isSmall()).toBe(true);

        await driver.scrollDown();
        await flushPromises();

        expect(await driver.numberOfItemsInList()).toBe(55);
        expect(await driver.nextPageLoaderDriver().exists()).toBe(false);
      });

      it('should allow configuring items per page', async () => {
        const driver = createDriver({
          dataSource: paginatedDataSource,
          itemsPerPage: 2,
        });

        await flushPromises();

        expect(await driver.numberOfItemsInList()).toBe(2);

        await driver.scrollDown();
        await flushPromises();

        expect(await driver.numberOfItemsInList()).toBe(4);

        await driver.scrollDown();
        await flushPromises();

        expect(await driver.numberOfItemsInList()).toBe(6);
      });
    });

    describe('image size', () => {
      it('should render tiny images', async () => {
        const driver = createDriver({
          dataSource: paginatedDataSource,
          imageSize: 'tiny',
        });

        await flushPromises();

        expect(await driver.getSelectorDriverAt(0).isImageTiny()).toBe(true);
      });

      it('should render small images', async () => {
        const driver = createDriver({
          dataSource: paginatedDataSource,
          imageSize: 'small',
        });

        await flushPromises();

        expect(await driver.getSelectorDriverAt(0).isImageSmall()).toBe(true);
      });

      it('should render portrait images', async () => {
        const driver = createDriver({
          dataSource: paginatedDataSource,
          imageSize: 'portrait',
        });

        await flushPromises();

        expect(await driver.getSelectorDriverAt(0).isImagePortrait()).toBe(
          true,
        );
      });

      it('should render large images', async () => {
        const driver = createDriver({
          dataSource: paginatedDataSource,
          imageSize: 'large',
        });

        await flushPromises();

        expect(await driver.getSelectorDriverAt(0).isImageLarge()).toBe(true);
      });

      it('should render cinema images', async () => {
        const driver = createDriver({
          dataSource: paginatedDataSource,
          imageSize: 'cinema',
        });

        await flushPromises();

        expect(await driver.getSelectorDriverAt(0).isImageCinema()).toBe(true);
      });

      it('should render circle images', async () => {
        const driver = createDriver({
          dataSource: paginatedDataSource,
          imageShape: 'circle',
        });

        await flushPromises();

        expect(await driver.getSelectorDriverAt(0).isImageCircle()).toBe(true);
      });

      it('should render rectangular images', async () => {
        const driver = createDriver({
          dataSource: paginatedDataSource,
          imageShape: 'rectangular',
        });

        await flushPromises();

        expect(await driver.getSelectorDriverAt(0).isImageRectangular()).toBe(
          true,
        );
      });
    });

    describe('radio', () => {
      const items = [
        { id: 1, title: 'first' },
        { id: '2', title: 'second' },
      ];
      const dataSource = paginatedDataSourceFactory(items);

      it('should render radio buttons', async () => {
        const driver = createDriver({ dataSource });

        await flushPromises();

        expect(await driver.getSelectorDriverAt(0).toggleType()).toBe('radio');
        expect(await driver.getSelectorDriverAt(1).toggleType()).toBe('radio');
      });

      it('all rows should be unchecked', async () => {
        const driver = createDriver({ dataSource });

        await flushPromises();

        expect(await driver.getSelectorDriverAt(0).isChecked()).toBe(false);
        expect(await driver.getSelectorDriverAt(0).isChecked()).toBe(false);
      });

      it('should toggle rows when clicking on them', async () => {
        const driver = createDriver({ dataSource });

        await flushPromises();

        await driver.getSelectorDriverAt(0).toggle();
        expect(await driver.getSelectorDriverAt(0).isChecked()).toBe(true);
        expect(await driver.getSelectorDriverAt(1).isChecked()).toBe(false);

        await driver.getSelectorDriverAt(1).toggle();
        expect(await driver.getSelectorDriverAt(0).isChecked()).toBe(false);
        expect(await driver.getSelectorDriverAt(1).isChecked()).toBe(true);
      });

      it('should remember the selection if triggered search', async () => {
        const driver = createDriver({ dataSource });
        await flushPromises();
        await driver.getSelectorDriverAt(0).toggle();
        await driver.searchDriver().inputDriver.focus();
        await driver.searchDriver().inputDriver.enterText('second');
        await flushPromises();

        expect(await driver.getSelectorDriverAt(0).isChecked()).toBe(false);

        await driver.searchDriver().inputDriver.clickClear();
        await flushPromises();

        expect(await driver.getSelectorDriverAt(0).isChecked()).toBe(true);
      });
    });

    describe('given `multiple` prop`', () => {
      const items = [
        { id: 1, title: 'first' },
        { id: '2', title: 'second' },
      ];

      const dataSource = paginatedDataSourceFactory(items);

      const multiselectListWithItems = async function(_items, checkbox) {
        const _dataSource = paginatedDataSourceFactory(_items);
        const driverCreator = checkbox
          ? createDriverWithCheckbox
          : createDriver;
        const driver = await driverCreator({
          dataSource: _dataSource,
          multiple: true,
        });
        return driver;
      };

      it('should render checkboxes', async () => {
        const driver = createDriver({ dataSource, multiple: true });

        await flushPromises();

        expect(await driver.getSelectorDriverAt(0).toggleType()).toBe(
          'checkbox',
        );
        expect(await driver.getSelectorDriverAt(1).toggleType()).toBe(
          'checkbox',
        );
      });

      it('should support a disabled selector', async () => {
        const driver = await multiselectListWithItems([
          { id: 1, title: 'first', disabled: true },
        ]);

        expect(await driver.getSelectorDriverAt(0).isDisabled()).toBe(true);
      });

      it('should not count selection of disabled items', async () => {
        const driver = await multiselectListWithItems(
          [{ id: 1, title: 'first', disabled: true }],
          true,
        );

        expect(await driver.toggleAllCheckboxDriver().getLabel()).toContain(
          '(0)',
        );
      });

      it('should not count selection of disabled items for deselecting all', async () => {
        const driver = await multiselectListWithItems(
          [{ id: 1, title: 'first', disabled: true }],
          true,
        );

        await driver.toggleAllCheckboxDriver().click();

        expect(await driver.toggleAllCheckboxDriver().getLabel()).toContain(
          '(0)',
        );
      });

      it('should not count selection of disabled items for selecting some', async () => {
        const driver = await multiselectListWithItems(
          [
            { id: 1, title: 'first', disabled: true },
            { id: 2, title: 'sec' },
          ],
          true,
        );

        await driver.getSelectorDriverAt(1).toggle();

        expect(await driver.toggleAllCheckboxDriver().getLabel()).toContain(
          '(1)',
        );
      });

      it('should count how many left for select all', async () => {
        const driver = await multiselectListWithItems(
          [
            { id: 1, title: 'first', disabled: true },
            { id: 2, title: 'sec' },
          ],
          true,
        );

        expect(await driver.toggleAllCheckboxDriver().getLabel()).toContain(
          '(1)',
        );
      });
    });

    describe('given items with `selected`', () => {
      const items = [
        { id: 1, title: 'first' },
        { id: 2, title: 'second', selected: true },
        { id: 3, title: 'third', disabled: true, selected: true },
      ];

      const dataSource = paginatedDataSourceFactory(items);

      it('should show correct label in footer', async () => {
        const driver = await createDriverWithCheckbox({
          dataSource,
          multiple: true,
        });

        expect(await driver.toggleAllCheckboxDriver().getLabel()).toContain(
          ' Deselect All (1)',
        );
      });

      it('should deselect all after click', async () => {
        const driver = await createDriverWithCheckbox({
          dataSource,
          multiple: true,
        });

        await driver.toggleAllCheckboxDriver().click();
        expect(await driver.toggleAllCheckboxDriver().getLabel()).toContain(
          ' Select All (2)',
        );
        expect(await driver.getSelectorDriverAt(0).isChecked()).toBe(false);
        expect(await driver.getSelectorDriverAt(1).isChecked()).toBe(false);
        expect(await driver.getSelectorDriverAt(2).isChecked()).toBe(true);
        expect(await driver.getSelectorDriverAt(2).isDisabled()).toBe(true);
      });
    });

    describe('defaults', () => {
      it('should render empty state', async () => {
        const driver = createDriver({
          dataSource: emptyDataSource,
        });
        await flushPromises();

        expect(await driver.showsEmptyState()).toBe(true);
        expect((await driver.getEmptyState()).textContent).toBe(
          "You don't have any items",
        );
      });

      it('should render noResultsFound state', async () => {
        const searchValue = 'wubba lubba dub dub';
        const driver = createDriver({
          dataSource: paginatedDataSource,
        });
        await flushPromises();
        await driver.searchDriver().inputDriver.focus();
        await driver.searchDriver().inputDriver.enterText(searchValue);
        await flushPromises();

        expect(await driver.showsNoResultsFoundState()).toBe(true);
        expect((await driver.getNoResultsFoundState()).textContent).toBe(
          `No items matched your search "${searchValue}"`,
        );
      });

      it('should render search placeholder "Search..."', async () => {
        const driver = createDriver({
          dataSource: paginatedDataSource,
        });

        await flushPromises();

        expect(await driver.searchDriver().inputDriver.getPlaceholder()).toBe(
          'Search...',
        );
      });

      it('should render large rectangular images', async () => {
        const driver = createDriver({
          dataSource: paginatedDataSource,
        });

        await flushPromises();

        expect(await driver.getSelectorDriverAt(0).isImageLarge()).toBe(true);
        expect(await driver.getSelectorDriverAt(0).isImageRectangular()).toBe(
          true,
        );
      });
    });
  }
});
