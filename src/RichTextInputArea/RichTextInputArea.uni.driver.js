import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import ReactTestUtils from 'react-dom/test-utils';

import { statusIndicatorDriverFactory } from '../StatusIndicator/StatusIndicator.uni.driver';

const enterRichTextValue = async (element, value) => {
  const nativeElement = await element.getNative(); // eslint-disable-line no-restricted-properties
  if (element.type === 'react') {
    ReactTestUtils.Simulate.beforeInput(nativeElement, { data: value });
  } else if (element.type === 'protractor') {
    await nativeElement.sendKeys(value);
  } else if (element.type === 'puppeteer') {
    await element.enterValue(value);
  } else {
    throw new Error('unsupported adapter');
  }
};

export const getContent = base => base.$('.public-DraftEditor-content');
export const getPlaceholder = base =>
  base.$('.public-DraftEditorPlaceholder-root');

export default (base, body) => {
  const getStatusIndicatorDriver = () =>
    statusIndicatorDriverFactory(
      base.$(`[data-hook="richtextarea-status-indicator"]`),
      body,
    );

  return {
    ...baseUniDriverFactory(base, body),
    isDisabled: async () =>
      Boolean(await getContent(base).attr('contenteditable')),
    getContent: () => getContent(base).text(),
    getPlaceholder: () => getPlaceholder(base).text(),
    enterText: async text => enterRichTextValue(getContent(base), text),

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
