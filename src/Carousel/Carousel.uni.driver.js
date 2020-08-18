import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

// It turns out that react-slick duplicates the children, so we ditch the cloned nodes
const withoutClonedNodes = (selector = '') =>
  `.slick-slide:not(.slick-cloned) ${selector}`;

export const carouselUniDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),
    isLoading: async () => (await base.$$('[data-hook="loader"]').count()) > 0,
    getChildren: () => base.$$(withoutClonedNodes()).map(child => child),
    getImages: () =>
      base
        .$$(withoutClonedNodes('[data-hook="carousel-img"]'))
        .map(img => img.attr('src')),
  };
};
