import { baseUniDriverFactory, findByHook } from '../../test/utils/unidriver';
import { dataHooks } from './constants';

export const listItemSectionDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),

    /**
     * Get title Text
     * @return {Promise<string>}
     */
    getTitle: () => findByHook(base, dataHooks.TITLE).text(),

    /**
     * Gets suffix
     * @return {BaseUniDriver<any>}
     */
    getSuffix: () => findByHook(base, dataHooks.SUFFIX),

    /**
     * Gets custom suffix
     * @return {BaseUniDriver<any>}
     */
    getCustomSuffix: () => findByHook(base, dataHooks.CUSTOM_SUFFIX),
  };
};
