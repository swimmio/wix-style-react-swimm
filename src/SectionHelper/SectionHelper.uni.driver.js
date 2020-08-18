import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { buttonDriverFactory } from '../Button/Button.uni.driver';
import { Appearance } from './constants';

export const sectionHelperUniDriverFactory = base => {
  const actionButtonDriver = () =>
    buttonDriverFactory(base.$('[data-hook="sectionhelper-action-btn"]'));
  const closeButtonDriver = () =>
    buttonDriverFactory(base.$('[data-hook="sectionhelper-close-btn"]'));
  const hasAppearance = async appearance =>
    (await base.attr('data-appearance')) === appearance;

  return {
    ...baseUniDriverFactory(base),
    titleText: () => base.$('[data-hook="sectionhelper-title"]').text(),
    actionText: () => actionButtonDriver().getButtonTextContent(),
    clickAction: () => actionButtonDriver().click(),
    clickClose: () => closeButtonDriver().click(),
    isCloseButtonDisplayed: () => closeButtonDriver().exists(),
    textContent: () => base.text(),
    isWarning: () => hasAppearance(Appearance.Warning),
    isStandard: () => hasAppearance(Appearance.Standard),
    isDanger: () => hasAppearance(Appearance.Danger),
    isExperimentalDark: () => hasAppearance(Appearance.ExperimentalDark),
    isSuccess: () => hasAppearance(Appearance.Success),
    isPremium: () => hasAppearance(Appearance.Premium),
    isPreview: () => hasAppearance(Appearance.Preview),
  };
};
