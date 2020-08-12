import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ChevronLeftLarge from 'wix-ui-icons-common/ChevronLeftLarge';
import ChevronRightLarge from 'wix-ui-icons-common/ChevronRightLarge';

import YearDropdown from './YearDropdown';
import MonthDropdown from './MonthDropdown';
import { classes } from './styles.st.css';
import Text from '../../Text';

const getMonthName = (months, month) => months[month] || months[0];

const DatePickerHead = ({
  date,
  localeUtils,
  onChange,
  onLeftArrowClick,
  onRightArrowClick,
  showMonthDropdown,
  showYearDropdown,
}) => {
  // We use global DayPicker-Nav--Left(--Right) class for consistency.
  // All styles of the DayPicker component are global and kept in ../DatePicker.scss
  return (
    <div data-hook="datepicker-head" className={classes.root}>
      <div
        className={classnames(
          classes.arrow,
          classes.arrowLeft,
          'DayPicker-Nav--Left',
        )}
        data-hook="datepicker-left-arrow"
        onClick={onLeftArrowClick}
      >
        <ChevronLeftLarge className={classes.arrowIcon} />
      </div>

      {showMonthDropdown ? (
        <MonthDropdown
          date={date}
          onChange={onChange}
          months={localeUtils.getMonths()}
        />
      ) : (
        <Text
          className={classes.caption}
          weight="normal"
          dataHook={'datepicker-month-caption'}
        >
          {getMonthName(localeUtils.getMonths(), date.getMonth())}
        </Text>
      )}

      {showYearDropdown ? (
        <YearDropdown date={date} onChange={onChange} />
      ) : (
        <Text
          className={classes.caption}
          weight="normal"
          dataHook={'datepicker-year-caption'}
        >
          {date.getFullYear()}
        </Text>
      )}

      <div
        className={classnames(
          classes.arrow,
          classes.arrowRight,
          'DayPicker-Nav--Right',
        )}
        data-hook="datepicker-right-arrow"
        onClick={onRightArrowClick}
      >
        <ChevronRightLarge className={classes.arrowIcon} />
      </div>
    </div>
  );
};

DatePickerHead.propTypes = {
  date: PropTypes.object.isRequired,
  localeUtils: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onLeftArrowClick: PropTypes.func.isRequired,
  onRightArrowClick: PropTypes.func.isRequired,
  showMonthDropdown: PropTypes.bool,
  showYearDropdown: PropTypes.bool,
};

export default DatePickerHead;
