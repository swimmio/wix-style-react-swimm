import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { testkit as inputDriverFactory } from '../../Input/Input.uni.driver';
import { iconButtonDriverFactory } from '../../IconButton/IconButton.uni.driver';

export const editableRowUniDriverFactory = base => {
  const input = base.$('[data-hook="edit-row-input"]');
  const approveBtn = base.$('[data-hook="edit-row-approve-button"]');
  const cancelBtn = base.$('[data-hook="edit-row-cancel-button"]');

  const inputDriver = inputDriverFactory(input);
  const approveBtnDriver = iconButtonDriverFactory(approveBtn);
  const cancelBtnDriver = iconButtonDriverFactory(cancelBtn);

  return {
    ...baseUniDriverFactory(base),
    isInputFocused: () => inputDriver.isFocus(),
    clickApprove: () => approveBtnDriver.click(),
    isApproveDisabled: () => approveBtnDriver.isButtonDisabled(),
    clickCancel: () => cancelBtnDriver.click(),
    getText: () => inputDriver.getValue(),
    setText: text => inputDriver.enterText(text),
    keyDown: keyCode => inputDriver.trigger('keyDown', { keyCode }),
  };
};
