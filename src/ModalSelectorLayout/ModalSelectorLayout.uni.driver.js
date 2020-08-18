import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { loaderUniDriverFactory } from '../Loader/Loader.uni.driver';
import { selectorUniDriverFactory } from '../Selector/Selector.uni.driver';
import { searchUniDriverFactory } from '../Search/Search.uni.driver';
import { textUniDriverFactory } from '../Text/Text.uni.driver';
import { dataHooks } from './ModalSelectorLayout.helpers';
import { checkboxUniDriverFactory } from '../Checkbox/Checkbox.uni.driver';
import { buttonDriverFactory } from '../Button/Button.uni.driver';

export const modalSelectorLayoutUniDriverFactory = (base, body) => {
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
  const cancelButtonDriver = () =>
    buttonDriverFactory(base.$('[data-hook="cancellation-button"]'), body);
  const okButtonDriver = () =>
    buttonDriverFactory(base.$('[data-hook="confirmation-button"]'), body);
  const subtitleTextDriver = () =>
    textUniDriverFactory(base.$(`[data-hook="${dataHooks.subtitle}"]`), body);
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
  const footerSelector = checkboxUniDriverFactory(
    base.$('[data-hook=footer-selector]', body),
  );

  return {
    ...baseUniDriverFactory(base),

    mainLoaderDriver,
    nextPageLoaderDriver,
    cancelButtonDriver,
    okButtonDriver,
    searchDriver,
    subtitleTextDriver,
    getTitle: () => findInModalByDataHook('header-layout-title').text(),
    clickOnClose: () => base.$('[data-hook="header-close-button"]').click(),
    showsEmptyState: () => emptyState().exists(),
    getEmptyState: () => emptyState()._prop('firstChild'),
    showsNoResultsFoundState: () => noResultsFoundState().exists(),
    getNoResultsFoundState: () => noResultsFoundState()._prop('firstChild'),
    listExists: () => getList().exists(),
    numberOfItemsInList: () => getSelectors().count(),
    getSelectorDriverAt: i => selectorDriverAt(i),
    scrollDown: async () =>
      // eslint-disable-next-line no-restricted-properties
      (await getModalBody().getNative()).dispatchEvent(new Event('scroll')),
    footerSelector: () => footerSelector,
  };
};
