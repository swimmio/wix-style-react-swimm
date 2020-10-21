import React from 'react';
import PropTypes from 'prop-types';

import { st, classes } from './CustomModalLayout.st.css';

import BaseModalLayout from '../BaseModalLayout';
import Button from '../Button';

/** CustomModalLayout */
const CustomModalLayout = ({
  children,
  removeContentPadding,
  showHeaderDivider,
  showFooterDivider,
  hideContentDividers,
  width,
  height,
  maxHeight,
  className,
  style,
  ...restProps
}) => {
  return (
    <BaseModalLayout
      {...restProps}
      className={st(classes.root, { removeContentPadding }, className)}
      style={{
        ...style,
        width: width !== undefined ? width : style.width,
        height: height !== undefined ? height : style.height,
        maxHeight: maxHeight !== undefined ? maxHeight : style.maxHeight,
      }}
      data-contentpadding={!removeContentPadding}
    >
      <BaseModalLayout.Header showHeaderDivider={showHeaderDivider} />
      <BaseModalLayout.Content contentHideDividers={hideContentDividers}>
        {children}
      </BaseModalLayout.Content>
      <BaseModalLayout.Footer showFooterDivider={showFooterDivider} />
      <BaseModalLayout.Footnote />
    </BaseModalLayout>
  );
};

CustomModalLayout.displayName = 'CustomModalLayout';

CustomModalLayout.propTypes = {
  /** ...BaseModalLayout.propTypes, */
  /** additional css classes */
  className: PropTypes.string,
  /** data hook for testing */
  dataHook: PropTypes.string,
  /** callback for when the close button is clicked */
  onCloseButtonClick: PropTypes.func,
  /** callback for when the help button is clicked */
  onHelpButtonClick: PropTypes.func,
  /** a global theme for the modal, will be applied as stylable state and will affect footer buttons skin */
  theme: PropTypes.oneOf(['standard', 'premium', 'destructive']),

  /** ...Header.propTypes, */
  /** The modal's title */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** The modal's subtitle */
  subtitle: PropTypes.string,

  /** ...Content.propTypes, */
  /** the content you want to render in the modal, children passed directly will be treated as `content` as well */
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /** ...Footer.propTypes, */
  /** will determine the action buttons size*/
  actionsSize: Button.propTypes.size,
  /** a text for the primary action button */
  primaryButtonText: PropTypes.string,
  /** a callback for when the primary action button is clicked */
  primaryButtonOnClick: PropTypes.func,
  /** Passed to the primary action button as props without any filter / mutation */
  primaryButtonProps: (() => {
    const { dataHook, ...buttonProps } = Button.propTypes;
    return PropTypes.shape(buttonProps);
  })(),
  /** a text for the secondary action button */
  secondaryButtonText: PropTypes.string,
  /** callback for when the secondary action button is clicked */
  secondaryButtonOnClick: PropTypes.func,
  /** Passed to the secondary button as props without any filter / mutation */
  secondaryButtonProps: (() => {
    const { dataHook, ...buttonProps } = Button.propTypes;
    return PropTypes.shape(buttonProps);
  })(),
  /** side actions node, to be rendered as the first element on the same row as the action buttons */
  sideActions: PropTypes.node,

  /** ...Footnote.propTypes, */
  /** a footnote node, to be rendered at the very bottom of the modal */
  footnote: PropTypes.node,

  /** CustomModalLayout */
  /** When set to true, there will be no content padding */
  removeContentPadding: PropTypes.bool,
  /** Modal desired width */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Modal desired height */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Modal desired max-height */
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Shows a divider at the bottom of the Header */
  showHeaderDivider: PropTypes.bool,
  /** Shows a divider at the top of the Footer */
  showFooterDivider: PropTypes.bool,
  /** Hides dividers that shows above/below the content while scrolling */
  hideContentDividers: PropTypes.bool,
};

CustomModalLayout.defaultProps = {
  theme: 'standard',
  actionsSize: 'small',
  removeContentPadding: false,
  showHeaderDivider: false,
  hideContentDividers: false,
  style: {},
};

export default CustomModalLayout;
