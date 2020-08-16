import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Checkbox from '../Checkbox';
import RadioButton from '../RadioGroup/RadioButton/RadioButton';
import RadioGroup from '../RadioGroup';
import Text from '../Text';
import styles from './Selector.scss';
import ExtraText from './ExtraText';
import ProgressBar from './ProgressBar';

class Selector extends React.PureComponent {
  static propTypes = {
    /** Applied as data-hook HTML attribute that can be used in the tests */
    dataHook: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.node,
    imageSize: PropTypes.oneOf([
      'tiny',
      'small',
      'portrait',
      'large',
      'cinema',
    ]),
    imageShape: PropTypes.oneOf(['rectangular', 'circle']),
    title: PropTypes.node.isRequired,
    isSelected: PropTypes.bool,
    isDisabled: PropTypes.bool,
    subtitle: PropTypes.string,
    extraNode: PropTypes.node,
    onToggle: PropTypes.func,
    toggleType: PropTypes.oneOf(['checkbox', 'radio']),
    showBelowNodeOnSelect: PropTypes.bool,
    belowNode: PropTypes.node,
    subtitleNode: PropTypes.node,
  };

  static defaultProps = {
    isSelected: false,
    isDisabled: false,
    toggleType: 'radio',
    imageSize: 'large',
    imageShape: 'rectangular',
    onToggle: i => i,
    showBelowNodeOnSelect: false,
  };

  radioButtonAndImageMargins = '57px';

  _onClick = () => !this.props.isDisabled && this.props.onToggle(this.props.id);

  _renderContent = () => {
    const {
      imageSize,
      imageShape,
      image,
      title,
      subtitle,
      extraNode,
      subtitleNode,
    } = this.props;
    return (
      <div className={styles.mainPart}>
        {image && (
          <div
            data-hook="selector-image"
            className={classNames(
              styles.image,
              styles[imageSize],
              styles[imageShape],
            )}
            children={image}
          />
        )}

        <div className={styles.titles}>
          <Text dataHook="selector-title" ellipsis children={title} />

          {subtitle && (
            <Text
              size="small"
              secondary
              dataHook="selector-subtitle"
              ellipsis
              children={subtitle}
            />
          )}

          {subtitleNode && <div data-hook="subtitle-node">{subtitleNode}</div>}
        </div>

        {extraNode && (
          <div
            className={styles.extra}
            data-hook="selector-extra-node"
            children={extraNode}
          />
        )}
      </div>
    );
  };

  render() {
    const {
      dataHook,
      isSelected,
      isDisabled,
      toggleType,
      showBelowNodeOnSelect,
      belowNode,
    } = this.props;

    return (
      <li data-hook={dataHook} className={styles.root} onClick={this._onClick}>
        {toggleType === 'checkbox' ? (
          <Checkbox
            selectionArea="hover"
            dataHook="toggle"
            checked={isSelected}
            disabled={isDisabled}
          >
            {this._renderContent()}
          </Checkbox>
        ) : (
          <RadioGroup
            selectionArea="hover"
            value={isSelected ? 1 : '2'}
            disabledRadios={isDisabled ? [1] : []}
          >
            <RadioButton dataHook="toggle" value={1}>
              {this._renderContent()}
            </RadioButton>
          </RadioGroup>
        )}
        {showBelowNodeOnSelect && belowNode && isSelected && (
          <div data-hook="below-section" className={styles.belowSection}>
            {belowNode}
          </div>
        )}
      </li>
    );
  }
}

Selector.ExtraText = ExtraText;
Selector.ProgressBar = ProgressBar;

export default Selector;
