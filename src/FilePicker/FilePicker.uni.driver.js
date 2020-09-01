import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const filePickerUniDriverFactory = base => {
  const error = base.$(`[data-hook=filePicker-error]`);
  const input = base.$('[data-hook="file-upload-input"]');
  const subLabel = base.$(`[data-hook="sub-label"]`);
  const mainLabel = base.$(`[data-hook="main-label"]`);

  return {
    ...baseUniDriverFactory(base),

    /** fulfilled if element has an error  */
    hasError: () => error.exists(),

    /** returns FilePicker error message text  */
    errorMessage: () => error.text(),

    /** returns FilePicker subLabel text  */
    getSubLabel: () => subLabel.text(),

    /** returns FilePicker mainLabel text  */
    getMainLabel: () => mainLabel.text(),

    /** returns FilePicker input name  */
    getName: () => input._prop('name'),
  };
};
