import React from 'react';
import PropTypes from 'prop-types';
import { st, classes } from './Animate.st.css';
import { childSize, childWidthRange } from './constants';

const isValueInRange = (x, min, max) => x >= min && x <= max;

/** Animate Component */
class Animate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      animationFinished: false,
      animationSize: undefined,
    };
    this.rootRef = React.createRef();
  }

  componentDidMount() {
    const animationSize = this._getAnimationSize();
    this.setState({ animationSize });
  }

  _onAnimationStart = () => {
    const { onStart } = this.props;
    this.setState(
      {
        animationFinished: false,
      },
      () => onStart && onStart(),
    );
  };

  _onAnimationEnd = () => {
    const { onEnd } = this.props;
    this.setState(
      {
        animationFinished: true,
      },
      () => onEnd && onEnd(),
    );
  };

  _getAnimationSize = () => {
    const childWidth = this.rootRef.current.offsetWidth;
    const { from, to } = childWidthRange.medium;

    return isValueInRange(childWidth, from, to)
      ? childSize.medium
      : childSize.small;
  };

  _getDelay = () => {
    const { delay } = this.props;

    switch (typeof delay) {
      case 'string':
        return { animationDelay: delay };
      case 'number':
        return { animationDelay: `${delay}ms` };
      default:
        return null;
    }
  };

  render() {
    const { active, dataHook, loop, children } = this.props;
    const { animationSize } = this.state;

    return (
      <div
        data-hook={dataHook}
        className={st(classes.root, { active, loop, size: animationSize })}
        style={this._getDelay()}
        onAnimationStart={this._onAnimationStart}
        onAnimationEnd={this._onAnimationEnd}
        ref={this.rootRef}
      >
        {children && React.Children.only(children)}
      </div>
    );
  }
}

Animate.displayName = 'Animate';

Animate.propTypes = {
  /** Applied as data-hook HTML attribute that can be used in the tests */
  dataHook: PropTypes.string,

  /** The component which we would like to animate. When given multiple components- only the first child node will be animated. */
  children: PropTypes.node.isRequired,

  /** Triggers the animation transition */
  active: PropTypes.bool,

  /** A callback fired immediately after the transition starts.*/
  onStart: PropTypes.func,

  /** A callback fired immediately after the transition ended.*/
  onEnd: PropTypes.func,

  /** when set to true, the child component animate repetitively until stopped by other event*/
  loop: PropTypes.bool,

  /** set a delay before the animation execution. When provided a number- sets this as `ms`.*/
  delay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Animate.defaultProps = {};

export default Animate;
