import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { ReactBase } from '../../test/utils/unidriver';

export const pageUniDriverFactory = base => {
  const reactBase = ReactBase(base);

  return {
    ...baseUniDriverFactory(base),
    hasClass: base.hasClass,

    /** true if header background image exist */
    backgroundImageExists: () =>
      base.$('[data-hook="page-background-image"]').exists(),

    /** true if gradient class name exist */
    gradientClassNameExists: () =>
      base.$('[data-hook="page-gradient-class-name"]').exists(),

    /** true if tail exist in DOM */
    tailExists: () => base.$('[data-hook="page-tail"]').exists(),

    /** return container height */
    gradientContainerHeight: async () => {
      const style = await base
        .$('[data-hook="page-gradient-class-name"]')
        ._prop('style');
      return style.height;
    },

    /** returns html in a string form */
    getPageHtml: () => base._prop('innerHTML'),
  };
};
