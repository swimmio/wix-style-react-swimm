import { textUniDriverFactory } from '../Text/Text.uni.driver';
import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const selectorUniDriverFactory = base => {
  const toggleInput = () => base.$('[data-hook="toggle"] input');
  const image = () => base.$('[data-hook="selector-image"]');
  const titleTextDriver = () =>
    textUniDriverFactory(base.$('[data-hook="selector-title"]'));
  const subtitleTextDriver = () =>
    textUniDriverFactory(base.$('[data-hook="selector-subtitle"]'));
  const extraNode = () => base.$('[data-hook="selector-extra-node"]');

  return {
    ...baseUniDriverFactory(base),

    isImageTiny: () => image().hasClass('tiny'),
    isImageSmall: () => image().hasClass('small'),
    isImagePortrait: () => image().hasClass('portrait'),
    isImageLarge: () => image().hasClass('large'),
    isImageCinema: () => image().hasClass('cinema'),
    isImageCircle: () => image().hasClass('circle'),
    isImageRectangular: () => image().hasClass('rectangular'),
    isDisabled: () => toggleInput()._prop('disabled'),
    toggleType: () => toggleInput()._prop('type'),
    isChecked: async () =>
      (await toggleInput().exists()) && toggleInput()._prop('checked'),
    hasImage: () => image().exists(),
    getImage: async () => image()._prop('firstChild'),
    titleTextDriver,
    subtitleTextDriver,
    hasExtraNode: () => extraNode().exists(),
    getExtraNode: () => extraNode()._prop('firstChild'),
    toggle: () => base.click(),
  };
};
