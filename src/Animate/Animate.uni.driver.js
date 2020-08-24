import { baseUniDriverFactory } from '../../test/utils/unidriver';

export const animateDriverFactory = (base, body) => {
  return {
    ...baseUniDriverFactory(base, body),

    /**
     * Gets animation delay
     * @return {Promise<string>}
     */
    getDelay: () => base._prop('style').then(style => style.animationDelay),
  };
};
