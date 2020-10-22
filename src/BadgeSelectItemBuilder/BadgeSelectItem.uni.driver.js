import {
  baseUniDriverFactory,
  getDataAttributeValue,
} from '../../test/utils/unidriver';
import { dataAttr } from './constants';

export const badgeSelectItemDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),

    getMarkerSkin: () => getDataAttributeValue(base, dataAttr.SKIN),
  };
};
