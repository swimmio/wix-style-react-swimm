import { BaseDriver } from 'wix-ui-test-utils/driver-factory';
import { LoaderDriver } from '../Loader/Loader.driver';
import { SelectorDriver } from '../Selector/Selector.driver';
import { SearchDriver } from '../Search/Search.driver';
import { CheckboxDriver } from '../Checkbox/Checkbox.driver';

export interface SelectorListDriver extends BaseDriver {
  mainLoaderDriver: () => LoaderDriver;
  nextPageLoaderDriver: () => LoaderDriver;
  searchDriver: () => SearchDriver;
  toggleAllCheckboxDriver: () => CheckboxDriver;
  showsEmptyState: () => boolean;
  getEmptyState: () => HTMLElement;
  showsNoResultsFoundState: () => boolean;
  getNoResultsFoundState: () => HTMLElement;
  listExists: () => boolean;
  numberOfItemsInList: () => number;
  getSelectorDriverAt: (i: number) => SelectorDriver;
  scrollDown: () => boolean;
}
