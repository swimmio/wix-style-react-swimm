import { findByHook } from '../../../test/utils/unidriver';
import { listItemSelectDriverFactory as publicDriverFactory } from '../ListItemSelect.uni.driver';
import { dataHooks } from '../constants';

export const listItemSelectPrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),

    /** Returns true iff selected */
    isSelected: async () => JSON.parse(await base.attr('data-selected')),

    /** Get title Node */
    getTitleNode: async () => {
      const title = await findByHook(base, dataHooks.TITLE);
      const count = await title.$$(':first-child').count();

      if (count > 0) {
        // eslint-disable-next-line no-restricted-properties
        return await title.$('div').getNative();
      } else {
        return await title.text();
      }
    },
  };
};
