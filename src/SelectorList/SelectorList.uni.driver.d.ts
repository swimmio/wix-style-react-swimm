import { BaseUniDriver } from 'wix-ui-test-utils/base-driver';
import { LoaderUniDriver } from '../Loader/Loader.uni.driver';
import { SelectorUniDriver } from '../Selector/Selector.uni.driver';
import { SearchUniDriver } from '../Search/Search.uni.driver';
import { CheckboxUniDriver } from '../Checkbox/Checkbox.uni.driver';

export interface SelectorListUniDriver extends BaseUniDriver {
  mainLoaderDriver: () => LoaderUniDriver;
  nextPageLoaderDriver: () => LoaderUniDriver;
  searchDriver: () => SearchUniDriver;
  toggleAllCheckboxDriver: () => CheckboxUniDriver;
  showsEmptyState: () => Promise<boolean>;
  getEmptyState: () => Promise<HTMLElement>;
  showsNoResultsFoundState: () => Promise<boolean>;
  getNoResultsFoundState: () => Promise<HTMLElement>;
  listExists: () => Promise<boolean>;
  numberOfItemsInList: () => Promise<number>;
  getSelectorDriverAt: (i: number) => SelectorUniDriver;
  scrollDown: () => Promise<boolean>;
}
