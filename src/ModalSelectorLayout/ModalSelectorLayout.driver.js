import { testkitFactoryCreator } from 'wix-ui-test-utils/vanilla';
import loaderDriverFactory from '../Loader/Loader.driver';
import selectorDriverFactory from '../Selector/Selector.driver';
import searchDriverFactory from '../Search/Search.driver';
import { dataHooks } from './ModalSelectorLayout.helpers';
import checkboxDriverFactory from '../Checkbox/Checkbox.driver';
import { customModalLayoutDriverFactory } from '../CustomModalLayout/CustomModalLayout.legacy.driver';
import textDriverFactory from '../Text/Text.driver';

const loaderTestkitFactory = testkitFactoryCreator(loaderDriverFactory);
const searchTestkitFactory = testkitFactoryCreator(searchDriverFactory);
const checkboxTestkitFactory = testkitFactoryCreator(checkboxDriverFactory);

const modalSelectorLayoutDriverFactory = ({ element }) => {
  const findInModalByDataHook = dataHook =>
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
  const cancelButtonDriver = () =>
    customModalLayoutDriverFactory({ element }).getSecondaryButtonDriver();
  const okButtonDriver = () =>
    customModalLayoutDriverFactory({ element }).getPrimaryButtonDriver();
  const subtitleTextDriver = () =>
    textDriverFactory({
      element: element.querySelector(`[data-hook="${dataHooks.subtitle}"]`),
    });
  const searchDriver = () =>
    searchTestkitFactory({
      wrapper: element,
      dataHook: dataHooks.search,
    });
  const getList = () => findInModalByDataHook(dataHooks.list);
  const getModalBody = () => findInModalByDataHook(dataHooks.modalBody);
  const getSelectors = () =>
    getList().querySelectorAll(`[data-hook="${dataHooks.selector}"]`);
  const selectorDriverAt = i =>
    selectorDriverFactory({ element: getSelectors()[i] });
  const emptyState = () => findInModalByDataHook(dataHooks.emptyState);
  const noResultsFoundState = () =>
    findInModalByDataHook(dataHooks.noResultsFoundState);
  const footerSelector = checkboxTestkitFactory({
    wrapper: element,
    dataHook: 'footer-selector',
  });

  return {
    exists: () => !!element,
    mainLoaderDriver,
    nextPageLoaderDriver,
    cancelButtonDriver,
    okButtonDriver,
    subtitleTextDriver,
    searchDriver,
    subtitleExists: () =>
      customModalLayoutDriverFactory({ element }).childExists(
        dataHooks.subtitle,
      ),
    getSubtitleText: () =>
      customModalLayoutDriverFactory({ element }).getSubtitleText(),
    getTitle: () => customModalLayoutDriverFactory({ element }).getTitleText(),
    clickOnClose: () =>
      customModalLayoutDriverFactory({ element }).clickCloseButton(),
    showsEmptyState: () => !!emptyState(),
    getEmptyState: () => emptyState().childNodes[0],
    showsNoResultsFoundState: () => !!noResultsFoundState(),
    getNoResultsFoundState: () => noResultsFoundState().childNodes[0],
    listExists: () => !!getList(),
    numberOfItemsInList: () => getSelectors().length,
    getSelectorDriverAt: i => selectorDriverAt(i),
    scrollDown: () => getModalBody().dispatchEvent(new Event('scroll')),
    footerSelector: () => footerSelector,
  };
};

export default modalSelectorLayoutDriverFactory;
