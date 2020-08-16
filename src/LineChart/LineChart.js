import React from 'react';
import PropTypes from 'prop-types';
import { st, classes } from './LineChart.st.css';
import * as d3 from 'd3';
import Tooltip from '../Tooltip';

/** LineChart */
class LineChart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.chart = React.createRef();

    this.margin = 15;
    this.width = 460 - 2 * this.margin;
    this.height = 250 - 2 * this.margin;

    // Add X axis --> it is a date format
    this.x = d3.scaleTime().range([0, this.width]);

    // Add Y axis
    this.y = d3.scaleLinear().range([this.height, 0]);

    // Line
    this.line = d3
      .line()
      .x(d => this.x(d.date))
      .y(d => this.y(d.value));
  }

  render() {
    const { data, className } = this.props;

    this.x.domain(d3.extent(data, d => d.date));
    this.y.domain([0, d3.max(data, d => +d.value)]);

    return (
      <div className={st(classes.root, {}, className)}>
        <svg
          ref={this.chart}
          width={this.width + 2 * this.margin}
          height={this.height + 2 * this.margin}
        >
          <g transform={`translate(${this.margin}, ${this.margin})`}>
            {/* Line */}
            <path
              fill="none"
              stroke="steelblue"
              strokeWidth={1.5}
              d={this.line(data)}
            />

            {/* Points */}
            {data.map(d => (
              <circle
                fill="steelblue"
                stroke="steelblue"
                r={4}
                cx={this.x(d.date)}
                cy={this.y(d.value)}
              />
            ))}
          </g>
        </svg>

        {/* Tooltips */}
        {data.map(d => (
          <div
            className={classes.tooltip}
            style={{
              left: this.x(d.date) + this.margin,
              top: this.y(d.value) + this.margin,
            }}
          >
            <Tooltip content={d.value}>
              <div className={classes.tooltipInner} />
            </Tooltip>
          </div>
        ))}
      </div>
    );
  }
}

LineChart.displayName = 'LineChart';

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

LineChart.defaultProps = {};

export default LineChart;
