import { baseUniDriverFactory, findByHook } from '../../test/utils/unidriver';
import { dataHooks } from './constants';

export const listItemSelectDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),

    /** Check whether the checkbox appears */
    hasCheckbox: async () =>
      await findByHook(base, dataHooks.CHECKBOX).exists(),

    /** Get prefix */
    getPrefix: () => findByHook(base, dataHooks.PREFIX),

    /** Get title Text */
    getTitle: async () => await findByHook(base, dataHooks.TITLE).text(),

    /** Get subtitle Text */
    getSubtitle: async () => {
      const subtitleElement = await findByHook(base, dataHooks.SUBTITLE);
      if (await subtitleElement.exists()) {
        return subtitleElement.text();
      }
    },

    /** Get suffix */
    getSuffix: () => findByHook(base, dataHooks.SUFFIX),
  };
};
