import { tooltipDriverFactory as tooltipUniDriverFactory } from 'wix-ui-core/dist/src/components/tooltip/Tooltip.uni.driver';
import { circularProgressBarUniDriverFactory as coreCircularProgressBarUniDriverFactory } from 'wix-ui-core/dist/src/components/circular-progress-bar/CircularProgressBar.uni.driver';
import { dataHooks } from './constants';

export const circularProgressBarDriverFactory = (base, body) => {
  const tooltip = base.$(`[data-hook="${dataHooks.tooltip}"]`);

  const createTooltipDriver = () => tooltipUniDriverFactory(tooltip, body);
  const coreProgressBarDriver = coreCircularProgressBarUniDriverFactory(base);

  const errorIcon = base => base.$(`[data-hook=${dataHooks.errorIcon}]`);
  const successIcon = base => base.$(`[data-hook=${dataHooks.successIcon}]`);
  const progressBar = base =>
    base.$(`[data-hook=${dataHooks.circularProgressBar}]`);

  const getTooltip = () => createTooltipDriver();

  return {
    ...coreProgressBarDriver,

    /** Checks whether error icon is shown */
    isErrorIconShown: () => errorIcon(base).exists(),

    /** Checks whether success icon is shown */
    isSuccessIconShown: () => successIcon(base).exists(),

    /** Get size */
    getSize: () => progressBar(base).attr('data-size'),

    /** Returns the tooltip error message */
    getTooltipErrorMessage: () => getTooltip().getTooltipText(),
  };
};
