import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const genericModalLayoutUniDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),
    isFullscreen: () => base.hasClass('fullscreenContainer'),
  };
};
