import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { iconButtonDriverFactory } from '../IconButton/IconButton.uni.driver';

export const pageHeaderUniDriverFactory = base => {
  const titleElement = () => base.$('[data-hook="page-header-title"] h1');
  const subtitleElement = () =>
    base.$('[data-hook="page-header-subtitle"] span');
  const breadcrumbsElement = () =>
    base.$('[data-hook="page-header-breadcrumbs"]');
  const actionBarElement = () => base.$('[data-hook="page-header-actionbar"]');
  const backButtonElement = () =>
    base.$('[data-hook="page-header-backbutton"]');

  return {
    ...baseUniDriverFactory(base),
    hasClass: base.hasClass,
    titleText: () => titleElement().text(),
    isTitleExists: () => titleElement().exists(),
    subtitleText: () => subtitleElement().text(),
    isSubtitleExists: () => subtitleElement().exists(),
    isBreadcrumbsExists: () => breadcrumbsElement().exists(),
    breadcrumbsText: () => breadcrumbsElement().text(),
    isActionBarExists: () => actionBarElement().exists(),
    isBackButtonExists: () => backButtonElement().exists(),
    clickBackButton: () => iconButtonDriverFactory(backButtonElement()).click(),
  };
};
