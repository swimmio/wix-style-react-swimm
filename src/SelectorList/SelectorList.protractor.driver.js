import {
  protractorUniTestkitFactoryCreator,
  protractorTestkitFactoryCreator,
} from 'wix-ui-test-utils/protractor';
import loaderDriverFactory from '../Loader/Loader.uni.driver';
import searchDriverFactory from '../Search/Search.protractor.driver';
import checkboxDriverFactory from '../Checkbox/Checkbox.protractor.driver';
import { dataHooks } from './SelectorList.helpers';

const loaderTestkitFactory = protractorUniTestkitFactoryCreator(
  loaderDriverFactory,
);
const searchTestkitFactory = protractorTestkitFactoryCreator(
  searchDriverFactory,
);
const checkboxTestkitFactory = protractorTestkitFactoryCreator(
  checkboxDriverFactory,
);

const SelectorListDriverFactory = component => {
  const findByDataHook = dataHook => component.$(`[data-hook="${dataHook}"]`);
  const findAllByDataHook = dataHook =>
    component.$$(`[data-hook="${dataHook}"]`);
  const mainLoaderDriver = () =>
    loaderTestkitFactory({ dataHook: dataHooks.mainLoader });
  const nextPageLoaderDriver = () =>
    loaderTestkitFactory({ dataHook: dataHooks.nextPageLoader });
  const searchDriver = () =>
    searchTestkitFactory({ dataHook: dataHooks.search });
  const toggleAllCheckboxDriver = () =>
    checkboxTestkitFactory({
      dataHook: dataHooks.toggleAllCheckbox,
    });

  return {
    element: () => component,
    mainLoaderDriver,
    nextPageLoaderDriver,
    searchDriver,
    toggleAllCheckboxDriver,
    getEmptyState: () => findByDataHook(dataHooks.emptyState),
    getNoResultsFoundState: () => findByDataHook(dataHooks.noResultsFoundState),
    listExists: () => findByDataHook(dataHooks.list).isPresent(),
    numberOfItemsInList: () => findAllByDataHook(dataHooks.selector).count(),
  };
};

export default SelectorListDriverFactory;
