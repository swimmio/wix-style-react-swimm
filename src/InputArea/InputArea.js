import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import StatusIndicator from '../StatusIndicator';
import debounce from 'lodash/debounce';
import isNaN from 'lodash/isNaN';
import styles from './InputArea.scss';
import { dataHooks } from './constants';

/**
 * General inputArea container
 */
class InputArea extends React.PureComponent {
  _computedStyle = null;
  state = {
    focus: false,
    counter: (this.props.value || this.props.defaultValue || '').length,
    computedRows: this.props.minRowsAutoGrow,
  };

  // For autoGrow prop min rows is 2 so the textarea does not look like an input
  static MIN_ROWS = 2;

  componentDidMount() {
    const { autoFocus, autoGrow } = this.props;

    autoFocus && this._onFocus();
    if (autoGrow) {
      this._calculateComputedRows();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.autoGrow &&
      prevProps.minRowsAutoGrow !== this.props.minRowsAutoGrow
    ) {
      this._calculateComputedRows();
    }
    if (this.props.hasCounter && prevProps.value !== this.props.value) {
      this.setState({
        counter: (this.props.value || this.props.defaultValue || '').length,
      });
    }
  }

  componentWillUnmount() {
    this._updateComputedStyle.cancel();
  }

  render() {
    const {
      dataHook,
      autoFocus,
      defaultValue,
      disabled,
      forceFocus,
      forceHover,
      id,
      name,
      onKeyUp,
      placeholder,
      readOnly,
      tabIndex,
      rows,
      autoGrow,
      value,
      required,
      minHeight,
      maxHeight,
      maxLength,
      resizable,
      hasCounter,
      size,
      tooltipPlacement,
      status,
      statusMessage,
    } = this.props;

    const inlineStyle = {};
    const rowsAttr = rows
      ? rows
      : autoGrow
      ? this.state.computedRows
      : undefined;
    const onInput = !rows && autoGrow ? this._onInput : undefined;

    if (minHeight) {
      inlineStyle.minHeight = minHeight;
    }

    if (maxHeight) {
      inlineStyle.maxHeight = maxHeight;
    }

    const classes = classNames({
      [styles.root]: true,
      [styles.hasStatus]: !!status,
      [styles.hasError]: status === 'error',
      [styles.hasWarning]: status === 'warning',
      [styles.hasHover]: forceHover,
      [styles.hasFocus]: forceFocus || this.state.focus,
      [styles.resizable]: !!resizable,
      [styles.nonResizable]: !resizable || !!disabled,
      [styles.disabled]: !!disabled,
    });

    const ariaAttribute = {};
    Object.keys(this.props)
      .filter(key => key.startsWith('aria'))
      .map(
        key =>
          (ariaAttribute['aria-' + key.substr(4).toLowerCase()] = this.props[
            key
          ]),
      );

    const inputAreaClasses = classNames(styles.inputArea, {
      [styles.sizeSmall]: size === 'small',
    });

    return (
      <div data-hook={dataHook} className={styles.wrapper}>
        <div className={classes}>
          <textarea
            rows={rowsAttr}
            maxLength={maxLength}
            ref={ref => (this.textArea = ref)}
            className={inputAreaClasses}
            id={id}
            name={name}
            style={inlineStyle}
            defaultValue={defaultValue}
            disabled={disabled}
            value={value}
            required={required}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            onKeyDown={this._onKeyDown}
            onChange={this._onChange}
            onInput={onInput}
            placeholder={placeholder}
            tabIndex={tabIndex}
            autoFocus={autoFocus}
            onKeyUp={onKeyUp}
            {...ariaAttribute}
            readOnly={readOnly}
          />
          {hasCounter && maxLength && (
            <span className={styles.counter} data-hook="counter">
              {this.state.counter}/{maxLength}
            </span>
          )}
        </div>
        <div className={styles.status}>
          {!!status && !disabled && (
            <StatusIndicator
              dataHook={dataHooks.tooltip}
              status={status}
              message={statusMessage}
              tooltipPlacement={tooltipPlacement}
            />
          )}
        </div>
      </div>
    );
  }

  focus = () => {
    this.textArea && this.textArea.focus();
  };

  blur = () => {
    this.textArea && this.textArea.blur();
  };

  select = () => {
    this.textArea && this.textArea.select();
  };

  _onFocus = e => {
    this.setState({ focus: true });
    this.props.onFocus && this.props.onFocus(e);

    if (this.props.autoSelect) {
      // Set timeout is needed here since onFocus is called before react
      // gets the reference for the input (specifically when autoFocus
      // is on. So setTimeout ensures we have the ref.input needed in select)
      setTimeout(() => this.select(), 0);
    }
  };

  _onBlur = e => {
    this.setState({ focus: false });
    this.props.onBlur && this.props.onBlur(e);
  };

  _onKeyDown = e => {
    this.props.onKeyDown && this.props.onKeyDown(e);

    if (e.key === 'Enter') {
      this.props.onEnterPressed && this.props.onEnterPressed(e);
    } else if (e.key === 'Escape') {
      this.props.onEscapePressed && this.props.onEscapePressed();
    }
  };

  _onChange = e => {
    this.props.onChange && this.props.onChange(e);
  };

  _onInput = () => {
    this._calculateComputedRows();
  };

  _calculateComputedRows = () => {
    this.setState({ computedRows: 1 }, () => {
      const rowsCount = this._getRowsCount();
      const computedRows = Math.max(this.props.minRowsAutoGrow, rowsCount);
      this.setState({
        computedRows,
      });
    });
  };

  _updateComputedStyle = debounce(
    () => {
      this._computedStyle = window.getComputedStyle(this.textArea);
    },
    500,
    { leading: true },
  );

  _getComputedStyle = () => {
    this._updateComputedStyle();
    return this._computedStyle;
  };

  _getRowsCount = () => {
    const computedStyle = this._getComputedStyle();
    const fontSize = parseInt(computedStyle.getPropertyValue('font-size'), 10);
    const lineHeight = parseInt(
      computedStyle.getPropertyValue('line-height'),
      10,
    );
    let lineHeightValue;

    if (isNaN(lineHeight)) {
      if (isNaN(fontSize)) {
        return InputArea.MIN_ROWS;
      }

      lineHeightValue = this._getDefaultLineHeight() * fontSize;
    } else {
      lineHeightValue = lineHeight;
    }

    return Math.floor(this.textArea.scrollHeight / lineHeightValue);
  };

  _getDefaultLineHeight = () => {
    if (!this._defaultLineHeight) {
      const { parentNode } = this.textArea;
      const computedStyles = this._getComputedStyle();
      const fontFamily = computedStyles.getPropertyValue('font-family');
      const fontSize = computedStyles.getPropertyValue('font-size');
      const tempElement = document.createElement('span');
      const defaultStyles =
        'position:absolute;display:inline;border:0;margin:0;padding:0;line-height:normal;';
      tempElement.setAttribute(
        'style',
        `${defaultStyles}font-family:${fontFamily};font-size:${fontSize};`,
      );
      tempElement.innerText = 'M';
      parentNode.appendChild(tempElement);
      this._defaultLineHeight =
        parseInt(tempElement.clientHeight, 10) / parseInt(fontSize, 10);
      tempElement.parentNode.removeChild(tempElement);
    }

    return this._defaultLineHeight;
  };
}

InputArea.displayName = 'InputArea';

InputArea.defaultProps = {
  minRowsAutoGrow: InputArea.MIN_ROWS,
  size: 'normal',
};

InputArea.propTypes = {
  /** Applied as data-hook HTML attribute that can be used in the tests */
  dataHook: PropTypes.string,

  ariaControls: PropTypes.string,
  ariaDescribedby: PropTypes.string,

  /** Used to define a string that labels the current element in case where a text label is not visible on the screen. */
  ariaLabel: PropTypes.string,

  /** Standard React Input autoFocus (focus the element on mount) */
  autoFocus: PropTypes.bool,

  /** Standard React Input autoSelect (select the entire text of the element on focus) */
  autoSelect: PropTypes.bool,

  /** Specifies the size of the input */
  size: PropTypes.oneOf(['small', 'normal']),

  /** Default value for those who wants to use this component un-controlled */
  defaultValue: PropTypes.string,

  /** Disables the input */
  disabled: PropTypes.bool,

  /** Sets UI to indicate a status */
  status: PropTypes.oneOf(['error', 'warning', 'loading']),

  /** The status message to display when hovering the status icon, if not given or empty there will be no tooltip */
  statusMessage: PropTypes.node,

  forceFocus: PropTypes.bool,
  forceHover: PropTypes.bool,

  /** When true a letters counter will appear */
  hasCounter: PropTypes.bool,
  id: PropTypes.string,

  /** Name Attribute */
  name: PropTypes.string,

  /** i.e. '12px' */
  maxHeight: PropTypes.string,

  /** Define max length allowed in the inputArea */
  maxLength: PropTypes.number,
  menuArrow: PropTypes.bool,

  /** i.e. '12px' */
  minHeight: PropTypes.string,

  /** onBlur callback */
  onBlur: PropTypes.func,

  /** onChange callback */
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onEnterPressed: PropTypes.func,
  onEscapePressed: PropTypes.func,

  /** onFocus callback */
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,

  /** Placeholder to display */
  placeholder: PropTypes.string,

  /** Sets the input to readOnly */
  readOnly: PropTypes.bool,
  resizable: PropTypes.bool,

  /** Sets initial height according to the number of rows (chrome uses the rows for minHeight as well) */
  rows: PropTypes.number,

  /** Will cause the Input Area to grow and shrink according to user input */
  autoGrow: PropTypes.bool,

  /** Sets the minimum amount of rows the component can have when in autoGrow mode */
  minRowsAutoGrow: PropTypes.number,

  tabIndex: PropTypes.number,

  /** Placement of the status tooltip */
  tooltipPlacement: PropTypes.string,

  /** Inputs value */
  value: PropTypes.string,

  /** Makes textarea required during form submission */
  required: PropTypes.bool,
};

export default InputArea;
