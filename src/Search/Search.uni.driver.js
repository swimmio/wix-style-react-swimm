import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { inputWithOptionsUniDriverFactory } from '../InputWithOptions/InputWithOptions.uni.driver';
import {
  EXPANDABLE_CLASS,
  EXPANDABLE_COLLAPSED,
  EXPANDABLE_EXPANDED,
} from './constants';

export const searchUniDriverFactory = (base, body) => {
  const inputWithOptionsUniDriver = inputWithOptionsUniDriverFactory(
    base.$(`[data-hook="search-inputwithoptions"]`),
    body,
  );

  return {
    ...baseUniDriverFactory(base),
    ...inputWithOptionsUniDriver,
    driver: {
      ...inputWithOptionsUniDriver.driver,
      isExpandable: () => base.hasClass(EXPANDABLE_CLASS),
      isCollapsed: async () =>
        (await base.hasClass(EXPANDABLE_COLLAPSED)) &&
        !(await base.hasClass(EXPANDABLE_EXPANDED)),
    },
  };
};
