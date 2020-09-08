import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const FontUpgradeDriverFactory = base => {
  const baseFactory = baseUniDriverFactory(base);
  return {
    ...baseFactory,
    getElement: selector => {
      return base.$(selector);
    },
    isActive: async () => {
      const element = await baseFactory.element();
      return element.dataset.active === 'true';
    },
  };
};
