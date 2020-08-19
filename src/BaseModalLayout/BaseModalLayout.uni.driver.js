import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { buttonDriverFactory } from '../Button/Button.uni.driver';
import { dataHooks } from './constants';
import { getFormattedDataHooks } from '../../test/utils';

const fDataHooks = getFormattedDataHooks(dataHooks);

export const baseModalLayoutDriverFactory = base => {
  const getButtonDriver = dataHook =>
    buttonDriverFactory(base.$(`[data-hook="${dataHook}"]`));

  return {
    ...baseUniDriverFactory(base),

    /** Returns the modal theme */
    getTheme: async () => base.attr('data-theme'),

    /** Click the modal close-button */
    clickCloseButton: async () => base.$(fDataHooks.closeButton).click(),

    /** Click the modal help-button */
    clickHelpButton: async () => base.$(fDataHooks.helpButton).click(),

    /** Checks that a node with the provided dataHook exists */
    childExists: async dataHook => base.$(`[data-hook="${dataHook}"]`).exists(),

    /** Get the title's text */
    getTitleText: async () => base.$(fDataHooks.headerTitle).text(),

    /** Get the subtitle's text */
    getSubtitleText: async () => base.$(fDataHooks.headerSubtitle).text(),

    /** Return the secondary button driver*/
    getSecondaryButtonDriver: async () =>
      getButtonDriver(dataHooks.footerSecondaryButton),

    /** Return the secondary button driver */
    getPrimaryButtonDriver: async () =>
      getButtonDriver(dataHooks.footerPrimaryButton),

    getIllustrationSrc: async () =>
      base.$(fDataHooks.illustrationSrc).attr('src'),
  };
};
