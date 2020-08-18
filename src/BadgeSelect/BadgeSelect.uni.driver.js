import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { badgeUniDriverFactory } from '../Badge/Badge.uni.driver';
import popoverUniDriverFactory from '../Popover/Popover.uni.driver';
import * as DATA_ATTR from './DataAttr';
import { dropdownLayoutDriverFactory } from '../DropdownLayout/DropdownLayout.uni.driver';
import { CommonDriver } from 'wix-ui-core/dist/src/components/popover/Popover.common.uni.driver';

export const badgeSelectUniDriverFactory = (base, body) => {
  const popoverDriver = popoverUniDriverFactory(base, body);
  const badgeDriver = badgeUniDriverFactory(
    base.$(`[data-hook="${DATA_ATTR.DATA_BADGE}"]`),
  );

  const driver = {
    ...baseUniDriverFactory(base),

    /** Returns 'true' whether the element exists */
    exists: popoverDriver.exists,

    /** Click on an option */
    clickAtOption: async index => {
      await badgeDriver.click();
      const popoverCommonTestkit = () => CommonDriver(base, body);
      const contentElement = await popoverCommonTestkit().getContentElement();
      const dropdownLayoutDriver = dropdownLayoutDriverFactory(
        contentElement.$(`[data-hook="${DATA_ATTR.DATA_DROPDOWN}"]`),
      );

      await dropdownLayoutDriver.clickAtOption(index);
    },
  };

  return {
    driver,
    badgeDriver,
  };
};
