import { tagUniDriverFactory } from './Tag.uni.driver';
import { dataHooks } from './Tag.helpers';
import { textUniDriverFactory } from '../Text/Text.uni.driver';

export const tagPrivateUniDriverFactory = base => {
  const removeButton = base.$(`[data-hook="${dataHooks.removeButton}"]`);
  const text = base.$(`[data-hook="${dataHooks.text}"]`);
  const textDriver = textUniDriverFactory(text);
  const isCloseButtonLarge = async () =>
    (await removeButton.attr('data-size')) === 'medium';

  return {
    ...tagUniDriverFactory(base),
    isCloseButtonSmall: async () => !(await isCloseButtonLarge()),
    isCloseButtonLarge,
    getTextSize: () => textDriver.getSize(),
    getTextWeight: () => textDriver.getWeight(),
    isClickable: () => base.hasClass('clickable'),
    isHoverable: () => base.hasClass('hoverable'),
  };
};
