import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const modalUniDriverFactory = (base, body) => {
  const getPortal = () => body.$('.portal');
  const getOverlay = () => body.$('.ReactModal__Overlay');
  const getContent = () => body.$('.ReactModal__Content');
  const getCloseButton = () => body.$('[data-hook="modal-close-button"]');

  const isOpen = () => getContent().exists();

  return {
    ...baseUniDriverFactory(base),
    /** true when the module is open */
    isOpen,
    /** true if theme <arg> exists in the modal */
    isThemeExist: theme =>
      getPortal()
        .$(`.${theme}`)
        .exists(),
    getChildBySelector: async selector =>
      (await getPortal()
        .$(selector)
        .exists())
        ? getPortal().$(selector)
        : null,
    /** true if the modal is scrollable */
    isScrollable: async () =>
      !(await getPortal().hasClass('portalNonScrollable')),
    closeButtonExists: () => getCloseButton().exists(),
    /** click on the modal overlay (helpful for testing if the modal is dismissed) */
    clickOnOverlay: () => getOverlay().click(),
    clickOnCloseButton: () => getCloseButton().click(),
    /** returns the element of the modal content (helpful to initialize a layout testkit) */
    // eslint-disable-next-line no-restricted-properties
    getContent: async () => await getContent().getNative(),
    /** returns the style of the modal content */
    getContentStyle: async () => await getContent()._prop('style'),
    /** returns the modal aria-label value as given in contentLabel property */
    getContentLabel: () => getContent().attr('aria-label'),
    getZIndex: async () => {
      const style = await getOverlay()._prop('style');

      return style['z-index'];
    },
  };
};
