import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const headingUniDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),
    /**
     * Get text content
     * @ReactDOMOnly
     * @returns {string} innerHTML
     * */
    getText: () => base._prop('innerHTML'),
    /**
     * Get appearance
     * @ReactDOMOnly
     * @returns {'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' }
     * */
    getAppearance: () => base.attr('data-appearance'),
    /**
     * Is light
     * @returns { boolean }
     */
    isLight: async () => (await base.attr('data-light')) === 'true',
  };
};
