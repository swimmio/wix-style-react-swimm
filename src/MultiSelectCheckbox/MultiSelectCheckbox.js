import React from 'react';
import PropTypes from 'prop-types';
import InputWithOptions from '../InputWithOptions/InputWithOptions';
import Input from '../Input';
import styles from './MultiSelectCheckbox.scss';
import ListItemSelect from '../ListItemSelect';
import ListItemSection from '../ListItemSection';

const OPEN_DROPDOWN_CHARS = ['Enter', 'ArrowDown', 'Space', ' '];

class MultiSelectCheckbox extends InputWithOptions {
  createOptions(options) {
    return options.map(option => {
      if (typeof option.value === 'function') {
        const value = option.value;
        return {
          ...option,
          value: props =>
            value({ ...props, selected: this.isSelectedId(option.id) }),
        };
      } else {
        if (option.value === '-') {
          return {
            ...option,
            overrideStyle: true,
            value: <ListItemSection type="divider" />,
          };
        } else {
          return {
            ...option,
            overrideStyle: true,
            value: props => (
              <ListItemSelect
                checkbox
                selected={this.isSelectedId(option.id)}
                disabled={option.disabled}
                title={option.value}
                highlighted={props.hovered}
                prefix={option.prefix}
                suffix={option.suffix}
                ellipsis={option.ellipsis}
                onClick={e => e.preventDefault()} // This is prevented because there's an event listener wrapping the option
              />
            ),
          };
        }
      }
    });
  }

  isSelectedId(optionId) {
    return this.props.selectedOptions.indexOf(optionId) !== -1;
  }

  dropdownAdditionalProps() {
    return {
      options: this.createOptions(this.props.options),
      closeOnSelect: false,
      selectedHighlight: false,
    };
  }

  selectedOptionsToText() {
    return this.props.selectedOptions
      .map(selectedOption =>
        this.props.options.find(option => option.id === selectedOption),
      )
      .filter(selectedOption => selectedOption)
      .map(this.props.valueParser)
      .join(this.props.delimiter);
  }

  inputAdditionalProps() {
    return {
      readOnly: false,
      disableEditing: true,
      inputElement: <Input textOverflow="ellipsis" disableEditing />,
      value: this.selectedOptionsToText(),
    };
  }

  inputClasses() {
    return styles.showPointer;
  }

  _onSelect(option) {
    this.showOptions();

    if (this.closeOnSelect()) {
      this.setState({ showOptions: false });
    }

    // The option object is not the original since it was injected a checkbox
    const originalOption = this.props.options.find(op => option.id === op.id);
    if (this.isSelectedId(originalOption.id)) {
      this.props.onDeselect &&
        this.props.onDeselect(originalOption.id, originalOption);
    } else {
      this.props.onSelect &&
        this.props.onSelect(originalOption.id, originalOption);
    }
  }

  _onInputClicked(event) {
    this.state.showOptions ? this.hideOptions() : this.showOptions();
    if (this.props.onInputClicked) {
      this.props.onInputClicked(event);
    }
  }

  _onKeyDown(event) {
    if (OPEN_DROPDOWN_CHARS.includes(event.key)) {
      event.preventDefault();
      this.showOptions();
    }

    this.dropdownLayout && this.dropdownLayout._onKeyDown(event);
  }

  _onFocus(e) {
    if (this.props.disabled) {
      return;
    }
    this._focused = true;
    this.setState({ isEditing: false });
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }
}

MultiSelectCheckbox.displayName = 'MultiSelectCheckbox';

MultiSelectCheckbox.propTypes = {
  ...InputWithOptions.propTypes,

  /** Array of objects. Objects must have an Id and can can include *value* and *node*. If value is '-', a divider will be rendered instead. */
  options: PropTypes.array,

  /** The selected options ids. */
  selectedOptions: PropTypes.array,

  /** A callback function called whenever the user selects a single option. The function receives the id of the selected option as the first argument, and the actual option object as the second argument.. */
  onSelect: PropTypes.func,

  /** A callback function to be called when an option was unchecked. The function receives the id of the unselected option as the first argument, and the actual option object as the second argument. */
  onDeselect: PropTypes.func,

  /** delimiter between the selected options that will be displayed in the input. */
  delimiter: PropTypes.string,
};

MultiSelectCheckbox.defaultProps = {
  ...InputWithOptions.defaultProps,
  delimiter: ', ',
  selectedOptions: [],
  closeOnSelect: false,
  valueParser: option => option.label || option.value,
};

export default MultiSelectCheckbox;
