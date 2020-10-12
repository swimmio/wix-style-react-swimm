import { baseUniDriverFactory } from '../../test/utils/unidriver';
import { loaderUniDriverFactory } from '../Loader/Loader.uni.driver';
import { selectorUniDriverFactory } from '../Selector/Selector.uni.driver';
import { searchUniDriverFactory } from '../Search/Search.uni.driver';
import { dataHooks } from './SelectorList.helpers';

export const SelectorListUniDriverFactory = (base, body) => {
  const findInModalByDataHook = dataHook => base.$(`[data-hook="${dataHook}"]`);
  const mainLoaderDriver = () =>
    loaderUniDriverFactory(
      base.$(`[data-hook="${dataHooks.mainLoader}"]`),
      body,
    );
  const nextPageLoaderDriver = () =>
    loaderUniDriverFactory(
      base.$(`[data-hook="${dataHooks.nextPageLoader}"]`),
      body,
    );
  const searchDriver = () =>
    searchUniDriverFactory(base.$(`[data-hook="${dataHooks.search}"]`), body);
  const getList = () => findInModalByDataHook(dataHooks.list);
  const getModalBody = () => findInModalByDataHook(dataHooks.modalBody);
  const getSelectors = () =>
    getList().$$(`[data-hook="${dataHooks.selector}"]`);
  const selectorDriverAt = i => selectorUniDriverFactory(getSelectors().get(i));
  const emptyState = () => findInModalByDataHook(dataHooks.emptyState);
  const noResultsFoundState = () =>
    findInModalByDataHook(dataHooks.noResultsFoundState);

  return {
    ...baseUniDriverFactory(base),

    /**
     * Gets main loader driver.
     * @returns {LoaderUniDriver}
     */
    mainLoaderDriver,
    /**
     * Gets next page loader driver.
     * @returns {LoaderUniDriver}
     */
    nextPageLoaderDriver,
    /**
     * Gets search driver.
     * @returns {SearchUniDriver}
     */
    searchDriver,
    /**
     * Checks weather empty state is shown.
     * @returns {Promise<boolean>} True if empty state is shown; false otherwise.
     */
    showsEmptyState: () => emptyState().exists(),
    /**
     * Gets empty state.
     * @returns {Promise<HTMLElement>}
     */
    getEmptyState: () => emptyState()._prop('firstChild'),
    /**
     * Checks weather no results found state is shown.
     * @returns {Promise<boolean>} True if no results found state is shown; false otherwise.
     */
    showsNoResultsFoundState: () => noResultsFoundState().exists(),
    /**
     * Gets no results found state.
     * @returns {Promise<HTMLElement>}
     */
    getNoResultsFoundState: () => noResultsFoundState()._prop('firstChild'),
    /**
     * Checks weather the list exists.
     * @returns {Promise<boolean>} True if list exists; false otherwise.
     */
    listExists: () => getList().exists(),
    /**
     * Returns the number of items in the list.
     * @returns {Promise<number>}
     */
    numberOfItemsInList: () => getSelectors().count(),
    /**
     * Gets the selector driver of the item at the passed index.
     * @param {number} i Item index
     * @returns {SelectorUniDriver} The selector driver.
     */
    getSelectorDriverAt: i => selectorDriverAt(i),
    /**
     * Triggers "scroll" event on the list.
     * @returns {Promise<boolean>}.
     */
    scrollDown: async () =>
      // eslint-disable-next-line no-restricted-properties
      (await getModalBody().getNative()).dispatchEvent(new Event('scroll')),
  };
};
