import { testkitFactoryCreator } from 'wix-ui-test-utils/vanilla';
import { dataHooks } from './Tag.helpers';
import textDriverFactory from '../Text/Text.driver';
import tagDriverFactory from './Tag.driver';
import { isClassExists } from '../../test/utils';

const textTestkitFactory = testkitFactoryCreator(textDriverFactory);

const getTextDriver = element => {
  return textTestkitFactory({
    wrapper: element,
    dataHook: dataHooks.text,
  });
};

const tagPrivateDriverFactory = ({ element }) => {
  const isCloseButtonLarge = () =>
    element
      .querySelector(`[data-hook="${dataHooks.removeButton}"]`)
      .getAttribute('data-size') === 'medium';

  return {
    ...tagDriverFactory({ element }),
    isCloseButtonSmall: () => !isCloseButtonLarge(),
    isCloseButtonLarge,
    getTextSize: () => getTextDriver(element).getSize(),
    getTextWeight: () => getTextDriver(element).getWeight(),
    isClickable: () => isClassExists(element, 'clickable'),
    isHoverable: () => isClassExists(element, 'hoverable'),
  };
};

export default tagPrivateDriverFactory;
