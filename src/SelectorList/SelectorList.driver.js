import { testkitFactoryCreator } from 'wix-ui-test-utils/vanilla';
import loaderDriverFactory from '../Loader/Loader.driver';
import selectorDriverFactory from '../Selector/Selector.driver';
import searchDriverFactory from '../Search/Search.driver';
import checkboxDriverFactory from '../Checkbox/Checkbox.driver';
import { dataHooks } from './SelectorList.helpers';

const loaderTestkitFactory = testkitFactoryCreator(loaderDriverFactory);
const searchTestkitFactory = testkitFactoryCreator(searchDriverFactory);
const checkboxTestkitFactory = testkitFactoryCreator(checkboxDriverFactory);

const SelectorListDriverFactory = ({ element }) => {
  const findInListByDataHook = dataHook =>
    element.querySelector(`[data-hook="${dataHook}"]`);
  const mainLoaderDriver = () =>
    loaderTestkitFactory({
      wrapper: element,
      dataHook: dataHooks.mainLoader,
    });
  const nextPageLoaderDriver = () =>
    loaderTestkitFactory({
      wrapper: element,
      dataHook: dataHooks.nextPageLoader,
    });
  const searchDriver = () =>
    searchTestkitFactory({
      wrapper: element,
      dataHook: dataHooks.search,
    });
  const toggleAllCheckboxDriver = () =>
    checkboxTestkitFactory({
      wrapper: element,
      dataHook: dataHooks.toggleAllCheckbox,
    });
  const getList = () => findInListByDataHook(dataHooks.list);
  const getListContent = () => findInListByDataHook(dataHooks.content);
  const getSelectors = () =>
    getList().querySelectorAll(`[data-hook="${dataHooks.selector}"]`);
  const selectorDriverAt = i =>
    selectorDriverFactory({ element: getSelectors()[i] });
  const emptyState = () => findInListByDataHook(dataHooks.emptyState);
  const noResultsFoundState = () =>
    findInListByDataHook(dataHooks.noResultsFoundState);

  return {
    exists: () => !!element,
    mainLoaderDriver,
    nextPageLoaderDriver,
    searchDriver,
    toggleAllCheckboxDriver,
    showsEmptyState: () => !!emptyState(),
    getEmptyState: () => emptyState().childNodes[0],
    showsNoResultsFoundState: () => !!noResultsFoundState(),
    getNoResultsFoundState: () => noResultsFoundState().childNodes[0],
    listExists: () => !!getList(),
    numberOfItemsInList: () => getSelectors().length,
    getSelectorDriverAt: i => selectorDriverAt(i),
    scrollDown: () => getListContent().dispatchEvent(new Event('scroll')),
  };
};

export default SelectorListDriverFactory;
