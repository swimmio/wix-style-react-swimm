import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { ReactBase } from '../../test/utils/unidriver';
import { statusIndicatorDriverFactory } from '../StatusIndicator/StatusIndicator.uni.driver';
import { dataHooks } from './constants';

export const getContent = base => base.$('.public-DraftEditor-content');
export const getPlaceholder = base =>
  base.$('.public-DraftEditorPlaceholder-root');

export default (base, body) => {
  const getStatusIndicatorDriver = () =>
    statusIndicatorDriverFactory(
      base.$(`[data-hook="${dataHooks.indicator}"]`),
      body,
    );

  return {
    ...baseUniDriverFactory(base),
    isDisabled: async () =>
      (await getContent(base).attr('contenteditable')) === 'false',
    getContent: () => getContent(base).text(),
    getPlaceholder: () => getPlaceholder(base).text(),
    enterText: async text => {
      const contentElement = await getContent(base).getNative(); // eslint-disable-line no-restricted-properties

      // TODO: implement for puppeteer. Throw error if type is not handled
      if (base.type === 'react') {
        return ReactBase(getContent(base)).beforeInput({ data: text });
      } else if (base.type === 'protractor') {
        contentElement.sendKeys(text);
      }
    },
    blur: async () => {
      if (base.type === 'react') {
        return ReactBase(getContent(base)).blur();
      } else if (base.type === 'puppeteer') {
        await page.$eval('.public-DraftEditor-content', e => e.blur());
      }
    },

    // Status
    /** Return true if there's a status */
    hasStatus: async status => {
      const statusIndicatorDriver = getStatusIndicatorDriver();
      if (await statusIndicatorDriver.exists()) {
        return status === (await statusIndicatorDriver.getStatus());
      }

      return false;
    },
    /** If there's a status message, returns its text value */
    getStatusMessage: async () => {
      const statusIndicatorDriver = getStatusIndicatorDriver();
      let tooltipText = null;

      if (await statusIndicatorDriver.hasMessage()) {
        tooltipText = await statusIndicatorDriver.getMessage();
      }

      return tooltipText;
    },
  };
};
