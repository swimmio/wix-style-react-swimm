import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { DataHooks } from './constants';

export const colorPickerUniDriverFactory = base => {
  const getConverter = () => base.$(`[data-hook="${DataHooks.converter}"]`);
  const getConverterTabs = async () => {
    return getConverter().$$(`li`);
  };

  return {
    ...baseUniDriverFactory(base),
    confirm: async () =>
      base.$(`[data-hook="${DataHooks.confirmButton}"]`).click(),
    cancel: async () =>
      base.$(`[data-hook="${DataHooks.cancelButton}"]`).click(),
    clickOnPreviousColor: async () =>
      base.$(`[data-hook="${DataHooks.historyPrevious}"]`).click(),
    historyPanelExists: async () =>
      base.$(`[data-hook="${DataHooks.history}"]`).exists(),
    historyCurrentColor: async () =>
      (await base.$(`[data-hook="${DataHooks.historyCurrent}"]`)._prop('style'))
        .background,
    historyPreviousColor: async () =>
      (
        await base
          .$(`[data-hook="${DataHooks.historyPrevious}"]`)
          ._prop('style')
      ).background,
    clickAddColor: async () =>
      base.$(`[data-hook=${DataHooks.addColor}]`).click(),
    getChildren: async () => base.$(`[data-hook="${DataHooks.children}"]`),

    selectRgbTab: async () => (await getConverterTabs()).get(1).click(),
    selectHsbTab: async () => (await getConverterTabs()).get(2).click(),
  };
};

export default colorPickerUniDriverFactory;
