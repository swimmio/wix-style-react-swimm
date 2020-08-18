import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const textUniDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),
    /**
     * Get the root element's tagName
     * @ReactDOMOnly
     * @returns {string} html tagName
     */
    getTagName: async () => (await base._prop('tagName')).toLowerCase(),
    /**
     * Get text content (innerHTML)
     * @ReactDOMOnly
     * @returns {string} innerHTML content
     */
    getText: () => base._prop('innerHTML'),
    /**
     * Get size
     * @returns { 'tiny' | 'small' | 'medium' }
     */
    getSize: () => base.attr('data-size'),
    /**
     * Get skin
     * @returns { 'standard'| 'error'| 'success'| 'premium'| 'disabled' }
     */
    getSkin: () => base.attr('data-skin'),
    /**
     * Get weight
     * @returns { 'thin' | 'normal' | 'bold' }
     */
    getWeight: () => base.attr('data-weight'),
    /**
     * Is light
     * @returns { boolean }
     */
    isLight: async () => (await base.attr('data-light')) === 'true',
    /**
     * Is secondary
     * @returns { boolean }
     */
    isSecondary: async () => (await base.attr('data-secondary')) === 'true',
  };
};
